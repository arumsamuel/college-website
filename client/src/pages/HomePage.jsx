import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const slides = [
  { src: '/assets/media/images/home/hero-2.jpg', alt: 'Historic campus building with clock tower' },
  { src: '/assets/media/images/home/hero-3.jpg', alt: 'Students studying together in a modern library' },
  { src: '/assets/media/images/campus/campus-1.jpg', alt: 'Students relaxing on the campus quad' }
];

const quickCards = [
  { icon: '📝', title: 'Apply Now', text: 'Start your application for Fall 2026. Rolling admissions with priority deadline December 1.', to: '/admissions' },
  { icon: '📚', title: 'Explore Academics', text: '60+ undergraduate programs across 4 colleges. Find your major today.', to: '/academics' },
  { icon: '🏛️', title: 'Visit Campus', text: 'Take a guided or self-guided tour. Experience College for yourself.', to: '/about' },
  { icon: '🎉', title: 'Student Life', text: '15 varsity teams, 120+ clubs, and a vibrant residential community.', to: '/student-life' }
];

const features = [
  { icon: '🎓', title: 'Accredited Excellence', text: 'Regionally accredited with a 94% first-year retention rate and top-tier faculty.' },
  { icon: '💼', title: 'Career Ready', text: '92% of graduates are employed or in grad school within 6 months of graduation.' },
  { icon: '🤝', title: 'Inclusive Community', text: 'Students from 47 states and 30 countries. A campus built on belonging.' },
  { icon: '🔬', title: 'Hands-On Research', text: 'Undergraduate research opportunities in every college, from day one.' }
];

export default function HomePage() {
  const [stats, setStats] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    api.get('/stats').then(setStats).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero" aria-label="Welcome to College">
        <div className="hero-slider" aria-hidden="true">
          {slides.map((s, i) => (
            <img key={s.src} src={s.src} alt="" className={i === slideIdx ? 'active' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
          ))}
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Where Ambition Meets <span className="gold-highlight">Opportunity</span></h1>
            <p>
              College has been shaping leaders for over 70 years. With 60+ programs, world-class faculty,
              and a campus built on belonging, your future starts here.
            </p>
            <div className="hero-buttons">
              <Link to="/admissions" className="btn btn-gold btn-lg">Apply Now &rarr;</Link>
              <Link to="/about" className="btn btn-outline btn-lg">Visit Campus</Link>
            </div>
            <div className="hero-stats">
              <div><h3>{stats ? stats.students.toLocaleString() : '12K+'}</h3><p>Students</p></div>
              <div><h3>{stats ? stats.programs : '60+'}</h3><p>Programs</p></div>
              <div><h3>#1</h3><p>Student Satisfaction</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert bar */}
      <div className="alert-bar" role="note">
        🗓️ Applications for Fall 2026 are open — priority deadline December 1, 2025.
      </div>

      {/* Quick cards */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Start Your <span className="gold-gradient-text">Journey</span></h2>
            <p>Four ways to get started at College.</p>
          </div>
          <div className="summary-cards">
            {quickCards.map(c => (
              <Link key={c.title} to={c.to} className="summary-card">
                <div className="feature-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="gold-text" style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>Learn more &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why College */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2>Why <span className="gold-gradient-text">College</span></h2>
            <p>An education that opens doors — and a community that feels like home.</p>
          </div>
          <div className="summary-cards">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome message from leadership */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="dash-card" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-8)', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--text-7xl)' }}>👩‍🏫</div>
              <h3 style={{ marginTop: 8 }}>Dr. Anita Desai</h3>
              <p className="gold-text" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>President, College</p>
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 12 }}>A Message from Our President</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                "Welcome to College. For more than seven decades, we've believed that a great education transforms lives
                and communities. Today, our students tackle real problems in real time — in labs, studios, and clinics,
                alongside faculty who are leaders in their fields. Whatever you dream, you'll find the tools, mentors,
                and community here to make it real. We can't wait to meet you."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stat-grid">
            <div className="stat-card"><div className="stat-value">94%</div><div className="stat-label">Retention Rate</div></div>
            <div className="stat-card"><div className="stat-value">92%</div><div className="stat-label">Career Outcomes</div></div>
            <div className="stat-card"><div className="stat-value">15:1</div><div className="stat-label">Student-Faculty Ratio</div></div>
            <div className="stat-card"><div className="stat-value">120+</div><div className="stat-label">Clubs & Organizations</div></div>
          </div>
        </div>
      </section>
    </>
  );
}
