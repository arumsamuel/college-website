// College Website - Seed data
// Seeds: demo student account + courses/grades/attendance/homework,
// sample CMS content (news, events, staff, board, library, announcements, registrations).
const bcrypt = require('bcryptjs');
const db = require('./database');

const DEMO_PASSWORD = 'demo1234';
const DEMO_EMAIL = 'demo@student.college.edu';

function seed() {
  const run = db.transaction(() => {
    // ─── Demo student ───
    const studentCount = db.prepare('SELECT COUNT(*) AS c FROM students').get().c;
    if (studentCount === 0) {
      const hash = bcrypt.hashSync(DEMO_PASSWORD, 10);
      const info = db.prepare(`
        INSERT INTO students (student_id, name, email, password_hash, program, year)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run('S-2026-0001', 'Jordan Avery', DEMO_EMAIL, hash, 'Computer Science', 2);
      const studentId = info.lastInsertRowid;

      // Courses
      const cs = db.prepare(`INSERT INTO courses (code, title, credits, department) VALUES (?, ?, ?, ?)`);
      [
        ['CS101', 'Introduction to Programming', 4, 'Computer Science'],
        ['CS220', 'Data Structures & Algorithms', 4, 'Computer Science'],
        ['MATH210', 'Discrete Mathematics', 3, 'Mathematics'],
        ['ENG110', 'College Writing', 3, 'English'],
        ['SCI201', 'Physics I', 4, 'Physics']
      ].forEach(c => cs.run(...c));

      const getCourse = title => db.prepare('SELECT id FROM courses WHERE title = ?').get(title).id;
      const cIntro = getCourse('Introduction to Programming');
      const cData = getCourse('Data Structures & Algorithms');
      const cMath = getCourse('Discrete Mathematics');
      const cEng = getCourse('College Writing');
      const cPhys = getCourse('Physics I');

      // Enrollments
      const enroll = db.prepare('INSERT INTO students_courses (student_id, course_id) VALUES (?, ?)');
      [cIntro, cData, cMath, cEng, cPhys].forEach(cid => enroll.run(studentId, cid));

      // Grades
      const grade = db.prepare('INSERT INTO grades (student_id, course_id, term, grade, points) VALUES (?, ?, ?, ?, ?)');
      [
        [cIntro, 'Fall 2025', 'A', 4.0],
        [cMath, 'Fall 2025', 'B+', 3.3],
        [cEng, 'Fall 2025', 'A-', 3.7],
        [cData, 'Spring 2026', 'A', 4.0],
        [cPhys, 'Spring 2026', 'B', 3.0]
      ].forEach(g => grade.run(studentId, g[0], g[1], g[2], g[3]));

      // Attendance
      const attendance = db.prepare('INSERT INTO attendance (student_id, course_id, date, status) VALUES (?, ?, ?, ?)');
      [
        [cIntro, '2026-01-12', 'present'],
        [cIntro, '2026-01-14', 'present'],
        [cData, '2026-01-13', 'present'],
        [cData, '2026-01-15', 'late'],
        [cMath, '2026-01-13', 'present'],
        [cPhys, '2026-01-14', 'absent'],
        [cPhys, '2026-01-16', 'present']
      ].forEach(a => attendance.run(studentId, a[0], a[1], a[2]));

      // Homework
      const hw = db.prepare('INSERT INTO homework (student_id, course_id, title, due_date, status, description) VALUES (?, ?, ?, ?, ?, ?)');
      [
        [cData, 'Heap Sort Implementation', '2026-01-30', 'pending', 'Implement heap sort in Python with in-place sorting and complexity analysis.'],
        [cData, 'Graph Traversal (BFS/DFS)', '2026-02-06', 'pending', 'Solve cycle detection using BFS and DFS. Provide test cases.'],
        [cIntro, 'Mini Project: To-Do App', '2026-02-01', 'in_progress', 'Build a command-line to-do manager with add/list/complete commands.'],
        [cMath, 'Set Theory Problem Set', '2026-01-28', 'submitted', 'Complete problems 1–20 in Chapter 2.'],
        [cPhys, 'Lab Report: Projectile Motion', '2026-02-10', 'graded', 'Analyze the experimental data using the projectile motion equations.']
      ].forEach(h => hw.run(studentId, h[0], h[1], h[2], h[3], h[4]));

      console.log('Seeded demo student: ' + DEMO_EMAIL + ' / ' + DEMO_PASSWORD);
    }

    // ─── Sample registrations ───
    const regCount = db.prepare('SELECT COUNT(*) AS c FROM registrations').get().c;
    if (regCount === 0) {
      const reg = db.prepare('INSERT INTO registrations (applicant_name, email, phone, program, status) VALUES (?, ?, ?, ?, ?)');
      [
        ['Maya Rodriguez', 'maya.r@example.com', '+15551234001', 'Business Administration', 'pending'],
        ['Ethan Park', 'ethan.p@example.com', '+15551234002', 'Nursing', 'accepted'],
        ['Sophia Nguyen', 'sophia.n@example.com', '+15551234003', 'Psychology', 'pending'],
        ['Liam O\'Brien', 'liam.o@example.com', '+15551234004', 'Computer Science', 'rejected']
      ].forEach(r => reg.run(...r));
      console.log('Seeded registrations.');
    }

    // ─── Announcements ───
    const annCount = db.prepare('SELECT COUNT(*) AS c FROM announcements').get().c;
    if (annCount === 0) {
      const ann = db.prepare('INSERT INTO announcements (title, body, audience, is_urgent) VALUES (?, ?, ?, ?)');
      [
        ['Winter Weather Advisory', 'Due to expected snowfall on Friday, classes will move to remote learning. Campus remains open for essential services.', 'all', 1],
        ['Spring Semester Begins', 'Welcome back! Spring 2026 classes start Monday, January 12. Check the academic calendar for your schedule.', 'all', 0],
        ['Library Extended Hours', 'The library will be open until midnight during final exam week.', 'all', 0],
        ['CS Department Hackathon', 'The CS department invites all students to the Spring Hackathon Friday, February 20. Register in the student portal.', 'Computer Science', 0]
      ].forEach(a => ann.run(...a));
      console.log('Seeded announcements.');
    }

    // ─── News ───
    const newsCount = db.prepare('SELECT COUNT(*) AS c FROM news').get().c;
    if (newsCount === 0) {
      const news = db.prepare('INSERT INTO news (title, category, summary, body, image_path) VALUES (?, ?, ?, ?, ?)');
      [
        ['College Announces $12M STEM Expansion', 'Campus', 'A new engineering and innovation center will open in Fall 2027.', 'The Board of Trustees approved a $12 million expansion of our STEM facilities, including a new engineering and innovation center with modern labs, maker spaces, and collaborative classrooms.', '/assets/media/images/campus/campus-1.jpg'],
        ['Faculty Research Awarded NSF Grant', 'Research', 'Professor Elena Vasquez receives grant for renewable energy research.', 'The National Science Foundation awarded Professor Elena Vasquez a $1.2M grant to research next-generation solar cell materials.', '/assets/media/images/campus/campus-2.jpg'],
        ['Men\'s Soccer Advances to Conference Finals', 'Athletics', 'The team secured a 2-1 victory in Saturday\'s semifinal.', 'Our men\'s soccer team advanced to the conference finals after a hard-fought 2-1 victory. The finals will be held at home on Saturday.', '/assets/media/images/student-life/sports-1.jpg']
      ].forEach(n => news.run(...n));
      console.log('Seeded news.');
    }

    // ─── Events ───
    const eventCount = db.prepare('SELECT COUNT(*) AS c FROM events').get().c;
    if (eventCount === 0) {
      const ev = db.prepare('INSERT INTO events (title, category, location, date, end_date, description) VALUES (?, ?, ?, ?, ?, ?)');
      [
        ['Spring Career Fair', 'Career', 'Student Union Ballroom', '2026-02-18', null, 'Meet 80+ employers recruiting for internships and full-time roles.'],
        ['Guest Lecture: AI Ethics', 'Academic', 'Science Hall 201', '2026-02-25', null, 'Dr. Amina Diallo discusses ethical frameworks for AI in healthcare.'],
        ['Basketball vs. Riverton', 'Athletics', 'Campus Arena', '2026-02-28', null, 'Come cheer on the Tigers at the final home game of the season.'],
        ['Theatre Production: Macbeth', 'Arts', 'Performing Arts Center', '2026-03-05', '2026-03-07', 'Student theatre department presents Shakespeare\'s Macbeth.'],
        ['Spring Break', 'Academic', 'Campus', '2026-03-09', '2026-03-13', 'No classes. Campus offices remain open with reduced hours.'],
        ['Final Exams', 'Academic', 'Campus', '2026-05-04', '2026-05-08', 'Final examination period for Spring 2026 semester.']
      ].forEach(e => ev.run(...e));
      console.log('Seeded events.');
    }

    // ─── Staff ───
    const staffCount = db.prepare('SELECT COUNT(*) AS c FROM staff').get().c;
    if (staffCount === 0) {
      const staff = db.prepare('INSERT INTO staff (name, title, department, email, phone, room, bio) VALUES (?, ?, ?, ?, ?, ?, ?)');
      [
        ['Dr. Elena Vasquez', 'Professor of Physics', 'Physics', 'e.vasquez@college.edu', '+15550110001', 'Sci 301', 'NSF grant recipient researching renewable energy materials.'],
        ['Dr. Marcus Hale', 'Associate Professor, Computer Science', 'Computer Science', 'm.hale@college.edu', '+15550110002', 'Eng 210', 'Algorithms, machine learning, and systems.'],
        ['Prof. Sarah Kim', 'Professor of English', 'English', 's.kim@college.edu', '+15550110003', 'Lib 115', 'Rhetoric, composition, and digital humanities.'],
        ['Dr. James Okonkwo', 'Professor of Mathematics', 'Mathematics', 'j.okonkwo@college.edu', '+15550110004', 'Sci 220', 'Number theory and applied mathematics.'],
        ['Maria Paredes', 'Director of Admissions', 'Admissions', 'm.paredes@college.edu', '+15550110005', 'Adm 101', 'Helping students find their path at College.'],
        ['Robert Chen', 'Registrar', 'Registrar', 'r.chen@college.edu', '+15550110006', 'Adm 205', 'Student records, enrollment, and academic scheduling.'],
        ['Dr. Grace Lee', 'Dean of Students', 'Student Affairs', 'g.lee@college.edu', '+15550110007', 'SU 110', 'Student life, conduct, and wellbeing.'],
        ['Tom Bridges', 'Head Coach, Basketball', 'Athletics', 't.bridges@college.edu', '+15550110008', 'Arena 1', 'Leading the Tigers basketball program.']
      ].forEach(s => staff.run(...s));
      console.log('Seeded staff.');
    }

    // ─── Board ───
    const boardCount = db.prepare('SELECT COUNT(*) AS c FROM board_members').get().c;
    if (boardCount === 0) {
      const board = db.prepare('INSERT INTO board_members (name, role, bio) VALUES (?, ?, ?)');
      [
        ['Dr. Anita Desai', 'Chair, Board of Trustees', 'Retired CEO and education advocate.'],
        ['Michael Thornton', 'Vice Chair', 'Partner at Thornton & Associates.'],
        ['Rev. David Whitfield', 'Secretary', 'Community liaison and university chaplain.'],
        ['Dr. Amara Osei', 'Trustee', 'Dean Emerita, College of Health Sciences.'],
        ['Henry Ford Jr.', 'Trustee', 'Alumni representative, class of 1998.']
      ].forEach(b => board.run(...b));
      console.log('Seeded board members.');
    }

    // ─── Library ───
    const libCount = db.prepare('SELECT COUNT(*) AS c FROM library_items').get().c;
    if (libCount === 0) {
      const lib = db.prepare('INSERT INTO library_items (title, author, type, location, available) VALUES (?, ?, ?, ?, ?)');
      [
        ['Introduction to Algorithms', 'Cormen et al.', 'Book', 'QA76.6 .C66', 1],
        ['Clean Code', 'Robert C. Martin', 'Book', 'QA76.73 .M37', 1],
        ['The Great Gatsby', 'F. Scott Fitzgerald', 'Book', 'PS3511 .I9', 0],
        ['Journal of Renewable Energy', 'Various', 'Journal', 'D1', 1],
        ['Statistical Methods for Research', 'S. Weisberg', 'Book', 'QA276 .W45', 1]
      ].forEach(l => lib.run(...l));
      console.log('Seeded library items.');
    }
  });

  run();
  console.log('Seed complete.');
}

// Auto-run when invoked directly, or via require from index.js
if (require.main === module) {
  seed();
}

module.exports = seed;
