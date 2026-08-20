import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';

const statusBadge = {
  pending: 'badge-pending',
  in_progress: 'badge-info',
  submitted: 'badge-gold',
  graded: 'badge-success'
};

export default function StudentDashboardPage() {
  const { student, signout, refreshStudent } = useAuth();
  const [profile, setProfile] = useState(student);
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [homework, setHomework] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [p, c, g, a, h, an] = await Promise.all([
          refreshStudent(),
          api.get('/students/me/courses'),
          api.get('/students/me/grades'),
          api.get('/students/me/attendance'),
          api.get('/students/me/homework'),
          api.get('/students/me/announcements')
        ]);
        setProfile(p);
        setCourses(c);
        setGrades(g);
        setAttendance(a);
        setHomework(h);
        setAnnouncements(an);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const gpa = grades.length
    ? (grades.reduce((s, g) => s + g.points, 0) / grades.length).toFixed(2)
    : '—';

  const present = attendance.filter(a => a.status === 'present').length;
  const attendancePct = attendance.length
    ? Math.round((present / attendance.length) * 100)
    : 0;

  const dueSoon = homework.filter(h => h.status === 'pending').length;

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" role="status" aria-label="Loading dashboard"><span className="sr-only">Loading...</span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Unable to load your dashboard</h3>
        <p>{error}</p>
        <Link to="/portal/signin" className="btn btn-gold" style={{ marginTop: 16 }}>Sign In Again</Link>
      </div>
    );
  }

  const isDemo = profile?.email === DEMO_CREDENTIALS.email;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Student Portal', to: '/portal/signin' }, { label: 'Dashboard' }]} />
      <PageHeader title="Student " highlight="Dashboard" subtitle={`Welcome back, ${profile?.name || 'Student'}. Here's your academic overview.`}>
        <button className="btn btn-outline btn-sm" onClick={signout} style={{ marginTop: 16 }}>Sign Out</button>
      </PageHeader>

      {isDemo && (
        <div className="alert-bar" role="note">
          🎫 You're exploring the demo account. Every feature below is live — try editing data or exploring the portal.
        </div>
      )}

      <section className="section-padding">
        <div className="container">
          {/* Profile overview */}
          <div className="dash-card" style={{ marginBottom: 'var(--space-8)' }}>
            <h3>👤 Profile Overview</h3>
            <div className="stat-grid" style={{ marginTop: 'var(--space-4)' }}>
              <div className="stat-card"><div className="stat-value" style={{ fontSize: 'var(--text-2xl)' }}>{profile?.name}</div><div className="stat-label">{profile?.student_id}</div></div>
              <div className="stat-card"><div className="stat-value" style={{ fontSize: 'var(--text-2xl)' }}>{profile?.program}</div><div className="stat-label">Program</div></div>
              <div className="stat-card"><div className="stat-value" style={{ fontSize: 'var(--text-2xl)' }}>Year {profile?.year}</div><div className="stat-label">{profile?.email}</div></div>
              <div className="stat-card"><div className="stat-value" style={{ fontSize: 'var(--text-2xl)' }}>{gpa}</div><div className="stat-label">GPA</div></div>
            </div>
          </div>

          {/* Stats */}
          <div className="stat-grid" style={{ marginBottom: 'var(--space-8)' }}>
            <div className="stat-card"><div className="stat-value">{courses.length}</div><div className="stat-label">Enrolled Courses</div></div>
            <div className="stat-card"><div className="stat-value">{attendancePct}%</div><div className="stat-label">Attendance</div></div>
            <div className="stat-card"><div className="stat-value">{dueSoon}</div><div className="stat-label">Assignments Due</div></div>
            <div className="stat-card"><div className="stat-value">{grades.length}</div><div className="stat-label">Grades on Record</div></div>
          </div>

          <div className="dash-grid">
            {/* Courses */}
            <div className="dash-card">
              <h3>📚 Enrolled Courses <span className="badge badge-gold">{courses.length}</span></h3>
              {courses.length === 0 && <div className="empty-state">No courses enrolled.</div>}
              <div className="table-wrapper">
                <table className="db-table">
                  <thead><tr><th>Code</th><th>Title</th><th>Credits</th></tr></thead>
                  <tbody>
                    {courses.map(c => (
                      <tr key={c.id}><td><strong>{c.code}</strong></td><td>{c.title}</td><td>{c.credits}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grades */}
            <div className="dash-card">
              <h3>📊 Grades</h3>
              {grades.length === 0 && <div className="empty-state">No grades recorded yet.</div>}
              <div className="table-wrapper">
                <table className="db-table">
                  <thead><tr><th>Course</th><th>Term</th><th>Grade</th></tr></thead>
                  <tbody>
                    {grades.map(g => (
                      <tr key={g.id}><td>{g.title}</td><td>{g.term}</td><td><span className="badge badge-gold">{g.grade}</span></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Homework */}
            <div className="dash-card">
              <h3>📝 Homework & Assignments <span className="badge badge-info">{dueSoon}</span></h3>
              {homework.length === 0 && <div className="empty-state">No homework assigned.</div>}
              {homework.map(h => (
                <div key={h.id} style={{ padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <strong style={{ fontSize: 'var(--text-sm)' }}>{h.title}</strong>
                    <span className={`badge ${statusBadge[h.status] || 'badge-info'}`}>{h.status.replace('_', ' ')}</span>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 4 }}>
                    {h.code} · Due {new Date(h.due_date).toLocaleDateString()}
                  </div>
                  {h.description && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>{h.description}</p>}
                </div>
              ))}
            </div>

            {/* Attendance */}
            <div className="dash-card">
              <h3>✅ Attendance</h3>
              {attendance.length === 0 && <div className="empty-state">No attendance records.</div>}
              <div className="table-wrapper">
                <table className="db-table">
                  <thead><tr><th>Date</th><th>Course</th><th>Status</th></tr></thead>
                  <tbody>
                    {attendance.map(a => (
                      <tr key={a.id}>
                        <td>{new Date(a.date).toLocaleDateString()}</td>
                        <td>{a.title}</td>
                        <td>
                          <span className={`badge ${a.status === 'present' ? 'badge-success' : a.status === 'late' ? 'badge-pending' : 'badge-error'}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="dash-card" style={{ marginTop: 'var(--space-8)' }}>
            <h3>📢 Announcements</h3>
            {announcements.length === 0 && <div className="empty-state">No announcements.</div>}
            {announcements.map(a => (
              <div key={a.id} style={{ padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {a.is_urgent === 1 && <span className="badge badge-error">Urgent</span>}
                  <strong>{a.title}</strong>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 4 }}>{a.body}</p>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 4 }}>
                  {new Date(a.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
