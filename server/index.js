// College Website - Express server
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('./database');
const { signToken, requireAuth } = require('./auth');
const { getChatReply } = require('./chatService');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// ─── Static: media assets + client build ───
const ASSETS_DIR = path.join(__dirname, '..', 'public', 'assets');
app.use('/assets', express.static(ASSETS_DIR));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

function handleErr(res, err) {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error' });
}

// ═══════════════════════════════════════════
//  AUTH — Students
// ═══════════════════════════════════════════
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, student_id, password, program, year } = req.body;
    if (!name || !email || !student_id || !password || !program || !year) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    const existing = db.prepare('SELECT id FROM students WHERE email = ? OR student_id = ?').get(email, student_id);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email or student ID already exists.' });
    }
    const hash = bcrypt.hashSync(password, 10);
    const info = db.prepare(`
      INSERT INTO students (student_id, name, email, password_hash, program, year)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(student_id, name, email, hash, program, Number(year));
    const student = db.prepare('SELECT id, student_id, name, email, program, year FROM students WHERE id = ?').get(info.lastInsertRowid);
    const token = signToken({ id: student.id, student_id: student.student_id, email: student.email });
    res.status(201).json({ token, student });
  } catch (err) { handleErr(res, err); }
});

app.post('/api/auth/signin', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
    const student = db.prepare('SELECT * FROM students WHERE email = ?').get(email);
    if (!student || !bcrypt.compareSync(password, student.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const payload = { id: student.id, student_id: student.student_id, email: student.email };
    const token = signToken(payload);
    res.json({ token, student: { id: student.id, student_id: student.student_id, name: student.name, email: student.email, program: student.program, year: student.year, enrollment_date: student.enrollment_date } });
  } catch (err) { handleErr(res, err); }
});

app.post('/api/auth/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });
    const student = db.prepare('SELECT id FROM students WHERE email = ?').get(email);
    // Always return success to avoid leaking which emails exist.
    res.json({ message: student ? 'If an account exists for that email, a reset link has been sent.' : 'If an account exists for that email, a reset link has been sent.' });
  } catch (err) { handleErr(res, err); }
});

// ═══════════════════════════════════════════
//  STUDENT PORTAL (protected)
// ═══════════════════════════════════════════
app.get('/api/students/me', requireAuth, (req, res) => {
  try {
    const s = db.prepare('SELECT id, student_id, name, email, program, year, enrollment_date FROM students WHERE id = ?').get(req.student.id);
    if (!s) return res.status(404).json({ error: 'Student not found.' });
    res.json(s);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/students/me/courses', requireAuth, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT c.id, c.code, c.title, c.credits, c.department
      FROM students_courses sc JOIN courses c ON sc.course_id = c.id
      WHERE sc.student_id = ?
    `).all(req.student.id);
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/students/me/grades', requireAuth, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT g.id, g.term, g.grade, g.points, c.code, c.title, c.credits
      FROM grades g JOIN courses c ON g.course_id = c.id
      WHERE g.student_id = ?
    `).all(req.student.id);
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/students/me/attendance', requireAuth, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT a.id, a.date, a.status, c.code, c.title
      FROM attendance a JOIN courses c ON a.course_id = c.id
      WHERE a.student_id = ?
    `).all(req.student.id);
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/students/me/homework', requireAuth, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT h.id, h.title, h.due_date, h.status, h.description, c.code, c.title
      FROM homework h JOIN courses c ON h.course_id = c.id
      WHERE h.student_id = ?
    `).all(req.student.id);
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/students/me/announcements', requireAuth, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT * FROM announcements
      WHERE audience = 'all' OR audience = ?
      ORDER BY is_urgent DESC, created_at DESC
    `).all(req.student.program || 'all');
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

// ═══════════════════════════════════════════
//  REGISTRATIONS (Admissions applications)
// ═══════════════════════════════════════════
app.post('/api/registrations', (req, res) => {
  try {
    const { applicant_name, email, phone, program } = req.body;
    if (!applicant_name || !email || !program) return res.status(400).json({ error: 'Name, email, and program are required.' });
    const info = db.prepare(`
      INSERT INTO registrations (applicant_name, email, phone, program)
      VALUES (?, ?, ?, ?)
    `).run(applicant_name, email, phone || null, program);
    res.status(201).json({ id: info.lastInsertRowid, message: 'Application submitted! We will contact you with next steps.', status: 'pending' });
  } catch (err) { handleErr(res, err); }
});

app.get('/api/registrations', (req, res) => {
  try {
    res.json(db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all());
  } catch (err) { handleErr(res, err); }
});

app.patch('/api/registrations/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'accepted', 'rejected'];
    if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
    db.prepare('UPDATE registrations SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ ok: true });
  } catch (err) { handleErr(res, err); }
});

// ═══════════════════════════════════════════
//  CMS CONTENT (news, events, staff, board, library, announcements)
// ═══════════════════════════════════════════
app.get('/api/news', (req, res) => {
  try {
    const { category } = req.query;
    let rows;
    if (category) {
      rows = db.prepare('SELECT * FROM news WHERE category = ? ORDER BY published_at DESC').all(category);
    } else {
      rows = db.prepare('SELECT * FROM news ORDER BY published_at DESC').all();
    }
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/events', (req, res) => {
  try {
    const { category } = req.query;
    let rows;
    if (category) {
      rows = db.prepare('SELECT * FROM events WHERE category = ? ORDER BY date ASC').all(category);
    } else {
      rows = db.prepare('SELECT * FROM events ORDER BY date ASC').all();
    }
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/staff', (req, res) => {
  try {
    const { q, department } = req.query;
    let rows;
    if (q && department) {
      rows = db.prepare('SELECT * FROM staff WHERE department = ? AND (name LIKE ? OR title LIKE ? OR room LIKE ?) ORDER BY department, name').all(department, `%${q}%`, `%${q}%`, `%${q}%`);
    } else if (q) {
      rows = db.prepare('SELECT * FROM staff WHERE name LIKE ? OR title LIKE ? OR department LIKE ? OR room LIKE ? ORDER BY department, name').all(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    } else if (department) {
      rows = db.prepare('SELECT * FROM staff WHERE department = ? ORDER BY name').all(department);
    } else {
      rows = db.prepare('SELECT * FROM staff ORDER BY department, name').all();
    }
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/board', (req, res) => {
  try {
    res.json(db.prepare('SELECT * FROM board_members ORDER BY role').all());
  } catch (err) { handleErr(res, err); }
});

app.get('/api/library', (req, res) => {
  try {
    const { q } = req.query;
    let rows;
    if (q) {
      rows = db.prepare('SELECT * FROM library_items WHERE title LIKE ? OR author LIKE ? ORDER BY title').all(`%${q}%`, `%${q}%`);
    } else {
      rows = db.prepare('SELECT * FROM library_items ORDER BY title').all();
    }
    res.json(rows);
  } catch (err) { handleErr(res, err); }
});

app.get('/api/announcements', (req, res) => {
  try {
    res.json(db.prepare('SELECT * FROM announcements ORDER BY is_urgent DESC, created_at DESC').all());
  } catch (err) { handleErr(res, err); }
});

// ═══════════════════════════════════════════
//  SEARCH
// ═══════════════════════════════════════════
app.get('/api/search', (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json({ news: [], staff: [], events: [], library: [] });
    const like = `%${q}%`;
    const news = db.prepare('SELECT * FROM news WHERE title LIKE ? OR summary LIKE ? OR body LIKE ? ORDER BY published_at DESC LIMIT 10').all(like, like, like);
    const staff = db.prepare('SELECT * FROM staff WHERE name LIKE ? OR title LIKE ? OR department LIKE ? LIMIT 10').all(like, like, like);
    const events = db.prepare('SELECT * FROM events WHERE title LIKE ? OR description LIKE ? LIMIT 10').all(like, like);
    const library = db.prepare('SELECT * FROM library_items WHERE title LIKE ? OR author LIKE ? LIMIT 10').all(like, like);
    res.json({ news, staff, events, library });
  } catch (err) { handleErr(res, err); }
});

// ═══════════════════════════════════════════
//  CONTACT
// ═══════════════════════════════════════════
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, department, subject, message } = req.body;
    if (!name || !email || !department || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const info = db.prepare(`
      INSERT INTO contact_messages (name, email, department, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, department, subject, message);
    res.status(201).json({ id: info.lastInsertRowid, message: 'Message sent! Our team will reply within one business day.' });
  } catch (err) { handleErr(res, err); }
});

// ═══════════════════════════════════════════
//  CHATBOT
// ═══════════════════════════════════════════
app.post('/api/chat', async (req, res) => {
  try {
    const { message, session_id, history } = req.body;
    if (!message || !session_id) return res.status(400).json({ error: 'Missing message or session_id' });

    let conv = db.prepare('SELECT * FROM chat_conversations WHERE session_id = ?').get(session_id);
    if (!conv) {
      const info = db.prepare('INSERT INTO chat_conversations (session_id) VALUES (?)').run(session_id);
      conv = { id: info.lastInsertRowid };
    }
    db.prepare('INSERT INTO chat_messages (conversation_id, sender, message) VALUES (?, ?, ?)').run(conv.id, 'user', message);
    const reply = await getChatReply(message, history || []);
    db.prepare('INSERT INTO chat_messages (conversation_id, sender, message) VALUES (?, ?, ?)').run(conv.id, 'bot', reply.text);
    res.json({ reply: reply.text, answered: reply.answered });
  } catch (err) { handleErr(res, err); }
});

// ═══════════════════════════════════════════
//  STATS
// ═══════════════════════════════════════════
app.get('/api/stats', (req, res) => {
  try {
    const count = table => db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get().c;
    res.json({
      students: count('students'),
      registrations: count('registrations'),
      programs: 60,
      news: count('news'),
      events: count('events'),
      staff: count('staff')
    });
  } catch (err) { handleErr(res, err); }
});

// ─── SPA fallback ───
const distIndex = path.join(__dirname, '..', 'client', 'dist', 'index.html');
app.get('*', (req, res, next) => {
  if (fs.existsSync(distIndex)) {
    return res.sendFile(distIndex);
  }
  res.status(200).json({ message: 'College Website API is running. Frontend not built yet — run `npm run build` in /client.' });
});

const PORT = process.env.PORT || 4010;
app.listen(PORT, () => {
  console.log(`✅ College Website API running on http://localhost:${PORT}`);
  require('./seed');
});
