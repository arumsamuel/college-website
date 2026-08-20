import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';

const services = [
  { icon: '🧠', title: 'Counseling Services', text: 'Confidential mental health counseling, crisis support, and wellness workshops. Available in-person and virtually.', contact: 'counseling@college.edu' },
  { icon: '🩺', title: 'Health Office', text: 'On-campus health clinic with nurses, physicians, and vaccination services. Open Mon–Fri 8am–5pm.', contact: 'health@college.edu' },
  { icon: '♿', title: 'Accessibility & Disability', text: 'Academic accommodations, assistive technology, and accessible campus resources for students with disabilities.', contact: 'accessibility@college.edu' },
  { icon: '🎒', title: 'Special Education', text: 'Support services and individualized plans for students with documented needs.', contact: 'specialed@college.edu' }
];

export default function SupportServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Support Services' }]} />
      <PageHeader title="Support " highlight="Services" subtitle="We're here for your wellbeing, health, and success — all services are confidential." />

      <section className="section-padding">
        <div className="container">
          <div className="summary-cards">
            {services.map(s => (
              <div key={s.title} className="feature-card">
                <div className="feature-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <p className="gold-text" style={{ fontWeight: 600, fontSize: 'var(--text-sm)', marginTop: 8 }}>{s.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="dash-card">
            <h3>🔒 Confidential Contact</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
              All counseling, health, and accessibility services are confidential. You can reach our support team
              through the confidential line below, or use the contact form on the <Link to="/contact" className="gold-text">Contact page</Link>.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <a href="tel:+15550102000" className="btn btn-gold">Call +1 (555) 010-2000</a>
              <a href="mailto:support@college.edu" className="btn btn-outline-dark">Email Support</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
