import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';

const leadership = [
  { name: 'Dr. Anita Desai', role: 'President', bio: 'Former CEO and education advocate. Leading College into its next era of growth.', img: '/assets/media/images/about/leadership.jpg' },
  { name: 'Dr. Marcus Hale', role: 'Provost', bio: 'Overseeing academics, research, and faculty excellence across all four colleges.', img: '/assets/media/images/about/campus-1.jpg' },
  { name: 'Dr. Grace Lee', role: 'Dean of Students', bio: 'Championing student life, wellbeing, and inclusive campus culture.', img: '/assets/media/images/about/leadership.jpg' }
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'About' }]} />
      <PageHeader title="About " highlight="College" subtitle="Our story, mission, and the people who make this campus extraordinary." />

      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="gold-gradient-text">History</span></h2>
            <p>Seven decades of excellence in education.</p>
          </div>
          <div className="dash-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-8)', alignItems: 'center' }}>
            <img src="/assets/media/images/about/campus-1.jpg" alt="Historic campus building" style={{ borderRadius: 'var(--radius-lg)', aspectRatio: '4/3', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
            <div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Founded in 1952 as Springfield Technical Institute, College has grown from a small two-year college
                into a comprehensive university serving more than 12,000 students. In 1978 we became a four-year
                institution; in 1994 we opened our College of Engineering; and in 2015 we launched our College of
                Health Sciences. Through it all, our commitment to access, excellence, and community has never wavered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="summary-cards">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To provide an accessible, rigorous, and inclusive education that empowers students to lead meaningful lives and strengthen their communities.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>To be the most student-centered university in the region — a model of academic excellence, innovation, and belonging.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Our Values</h3>
              <p>Integrity, curiosity, inclusion, sustainability, and service. These guide everything we do, from the classroom to the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="dash-card">
            <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: 12 }}>Accreditation</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              College is accredited by the Higher Learning Commission (HLC). Our engineering programs are additionally
              accredited by ABET, and our nursing programs by the Commission on Collegiate Nursing Education (CCNE).
              Accreditation ensures our programs meet rigorous national standards of quality.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2>Leadership <span className="gold-gradient-text">Team</span></h2>
            <p>The people guiding College into the future.</p>
          </div>
          <div className="engineer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            {leadership.map(l => (
              <div key={l.name} className="engineer-card">
                <div className="engineer-avatar">
                  <img src={l.img} alt={l.name} loading="lazy" onError={e => { e.target.style.display = 'none'; }} />
                </div>
                <div className="engineer-body">
                  <h3>{l.name}</h3>
                  <div className="badge badge-gold">{l.role}</div>
                  <p className="engineer-bio">{l.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus map / tour */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2>Campus <span className="gold-gradient-text">Map & Tour</span></h2>
            <p>Explore our campus — in person or virtually.</p>
          </div>
          <div className="dash-card">
            <div style={{ textAlign: 'center', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card-alt)', border: '1px dashed var(--border-strong)' }}>
              <div style={{ fontSize: 'var(--text-6xl)', marginBottom: 12 }}>🗺️</div>
              <h3 style={{ marginBottom: 8 }}>Interactive Campus Map</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>Visit our 180-acre campus at 100 University Avenue. Book a guided tour with Admissions or take a self-guided walk.</p>
              <Link to="/admissions" className="btn btn-gold">Book a Tour</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
