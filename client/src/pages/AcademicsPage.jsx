import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';

const colleges = [
  { icon: '🔬', name: 'College of Arts & Sciences', text: 'Biology, Chemistry, English, History, Mathematics, Philosophy, Physics, Psychology, Sociology, and more.' },
  { icon: '⚙️', name: 'College of Engineering', text: 'Computer Science, Electrical Engineering, Mechanical Engineering, Civil Engineering, and Robotics.' },
  { icon: '💼', name: 'College of Business', text: 'Business Administration, Accounting, Finance, Marketing, Economics, and Entrepreneurship.' },
  { icon: '🏥', name: 'College of Health Sciences', text: 'Nursing, Pre-Medicine, Public Health, Exercise Science, and Nutrition.' }
];

const majors = [
  'Computer Science', 'Software Engineering', 'Data Science', 'Cybersecurity', 'Electrical Engineering',
  'Mechanical Engineering', 'Business Administration', 'Accounting', 'Finance', 'Marketing',
  'Nursing', 'Public Health', 'Biology', 'Chemistry', 'Physics', 'Mathematics', 'English',
  'History', 'Psychology', 'Sociology', 'Political Science', 'Economics', 'Art & Design', 'Music'
];

const years = [
  { name: 'First-Year', desc: 'Foundational courses, core curriculum, and exploration across disciplines.' },
  { name: 'Sophomore', desc: 'Declare your major and dive into introductory courses within your department.' },
  { name: 'Junior', desc: 'Upper-level coursework, internships, research, and study abroad options.' },
  { name: 'Senior', desc: 'Capstone projects, thesis work, and career preparation.' }
];

export default function AcademicsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Academics' }]} />
      <PageHeader title="Academics at " highlight="College" subtitle="Explore 60+ programs across four colleges. Find the path that's right for you." />

      {/* Colleges */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header"><h2>Our <span className="gold-gradient-text">Colleges</span></h2><p>Four colleges. One commitment to your success.</p></div>
          <div className="summary-cards">
            {colleges.map(c => (
              <div key={c.name} className="feature-card">
                <div className="feature-icon">{c.icon}</div>
                <h3>{c.name}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Majors */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>Majors & <span className="gold-gradient-text">Minors</span></h2><p>A sample of our 60+ undergraduate programs.</p></div>
          <div className="dash-card">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {majors.map(m => (
                <span key={m} className="badge badge-gold" style={{ fontSize: 'var(--text-sm)', padding: '8px 16px' }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Year structure */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>The <span className="gold-gradient-text">Four-Year</span> Journey</h2><p>How your path unfolds at College.</p></div>
          <div className="steps-row">
            {years.map(y => (
              <div key={y.name} className="step-card">
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 8 }}>{y.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{y.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media + faculty */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>Inside the <span className="gold-gradient-text">Classroom</span></h2></div>
          <div className="media-grid">
            <figure className="media-item">
              <img src="/assets/media/images/academics/library.jpg" alt="College library reading room" loading="lazy" onError={e => { e.target.style.display = 'none'; }} />
              <figcaption>The James W. Chen Library</figcaption>
            </figure>
            <figure className="media-item">
              <img src="/assets/media/images/academics/lecture.jpg" alt="Students in a collaborative lecture" loading="lazy" onError={e => { e.target.style.display = 'none'; }} />
              <figcaption>Collaborative learning in action</figcaption>
            </figure>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/staff-directory" className="btn btn-gold">Browse Faculty Directory &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
}
