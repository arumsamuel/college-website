import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

const steps = [
  { n: '1', t: 'Submit Application', d: 'Complete the online application form. It takes about 15 minutes.' },
  { n: '2', t: 'Send Transcripts', d: 'Submit high school transcripts and standardized test scores (optional).' },
  { n: '3', t: 'Interview (Select Programs)', d: 'Some programs require an interview. We will reach out to schedule.' },
  { n: '4', t: 'Receive Decision', d: 'See your admission decision and next steps in the Student Portal.' }
];

const deadlines = [
  { d: 'December 1, 2025', e: 'Priority application deadline for Fall 2026' },
  { d: 'February 1, 2026', e: 'Regular decision deadline' },
  { d: 'March 1, 2026', e: 'Financial aid application deadline' },
  { d: 'May 1, 2026', e: 'Tuition deposit deadline' }
];

const faqs = [
  { q: 'What is the application fee?', a: 'The application fee is $50. It is waived for students who qualify for free or reduced lunch, first-generation students, and veterans.' },
  { q: 'Do you require test scores?', a: 'No. College is test-optional. We evaluate your application holistically based on grades, activities, and essays.' },
  { q: 'What GPA do I need?', a: 'The average admitted GPA is 3.4. We review each applicant holistically, so there is no strict cutoff.' },
  { q: 'When will I hear back?', a: 'Priority applicants receive decisions by January 15. Regular decision applicants by March 15.' }
];

const scholarships = [
  { name: 'Presidential Scholarship', amount: '$12,000 / year', desc: 'Awarded to top academic performers (GPA 3.8+).' },
  { name: 'Dean\'s Merit Award', amount: '$8,000 / year', desc: 'For students with strong academic records (GPA 3.4+).' },
  { name: 'First-Generation Grant', amount: '$5,000 / year', desc: 'For students who are the first in their family to attend college.' },
  { name: 'Athletic Scholarship', amount: 'Varies', desc: 'Awarded by coaching staff in select varsity sports.' }
];

export default function AdmissionsPage() {
  const [form, setForm] = useState({ applicant_name: '', email: '', phone: '', program: '' });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    setError(null);
    try {
      const data = await api.post('/registrations', form);
      setMsg(data.message);
      setForm({ applicant_name: '', email: '', phone: '', program: '' });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Admissions' }]} />
      <PageHeader title="Admissions at " highlight="College" subtitle="Your journey to College starts here. Apply in four simple steps." />

      {/* Steps */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header"><h2>How to <span className="gold-gradient-text">Apply</span></h2><p>Follow these four steps to complete your application.</p></div>
          <div className="steps-row">
            {steps.map(s => (
              <div key={s.n} className="step-card">
                <div className="step-number">{s.n}</div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 8 }}>{s.t}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form + deadlines */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-8)' }}>
            <div className="form-card">
              <h2>Apply for Admission</h2>
              {msg && <div className="form-message success" role="status">{msg}</div>}
              {error && <div className="form-message error" role="alert">{error}</div>}
              <form onSubmit={submit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name <span className="required">*</span></label>
                  <input id="name" name="applicant_name" className="form-control" required value={form.applicant_name} onChange={update} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input id="email" name="email" type="email" className="form-control" required value={form.email} onChange={update} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" className="form-control" value={form.phone} onChange={update} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="program">Program of Interest <span className="required">*</span></label>
                  <select id="program" name="program" className="form-control" required value={form.program} onChange={update}>
                    <option value="">Select a program...</option>
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Nursing</option>
                    <option>Psychology</option>
                    <option>Engineering</option>
                    <option>Biology</option>
                    <option>English</option>
                    <option>Mathematics</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-gold btn-block">Submit Application</button>
              </form>
            </div>
            <div>
              <div className="dash-card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3>Key Deadlines</h3>
                <ul className="contact-list">
                  {deadlines.map(d => (
                    <li key={d.d}><strong>{d.d}</strong><span>{d.e}</span></li>
                  ))}
                </ul>
              </div>
              <div className="dash-card">
                <h3>Printable Forms</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>Download and print application forms.</p>
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  <a href="#" className="btn btn-outline-dark btn-sm" onClick={e => e.preventDefault()}>📄 Application</a>
                  <a href="#" className="btn btn-outline-dark btn-sm" onClick={e => e.preventDefault()}>📄 FAFSA</a>
                  <a href="#" className="btn btn-outline-dark btn-sm" onClick={e => e.preventDefault()}>📄 Transcript</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tuition */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>Tuition & <span className="gold-gradient-text">Fees</span></h2><p>2026–2027 academic year.</p></div>
          <div className="table-wrapper">
            <table className="db-table">
              <thead><tr><th>Item</th><th>In-State</th><th>Out-of-State</th></tr></thead>
              <tbody>
                <tr><td>Tuition (full-time, per year)</td><td>$12,400</td><td>$24,800</td></tr>
                <tr><td>Housing</td><td>$8,200</td><td>$8,200</td></tr>
                <tr><td>Dining</td><td>$4,500</td><td>$4,500</td></tr>
                <tr><td>Fees &amp; materials</td><td>$1,200</td><td>$1,200</td></tr>
                <tr><td><strong>Estimated Total</strong></td><td><strong>$26,300</strong></td><td><strong>$38,700</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>Financial Aid & <span className="gold-gradient-text">Scholarships</span></h2><p>Over 80% of students receive financial assistance.</p></div>
          <div className="summary-cards">
            {scholarships.map(s => (
              <div key={s.name} className="feature-card">
                <h3>{s.name}</h3>
                <p className="gold-text" style={{ fontWeight: 700, margin: '8px 0' }}>{s.amount}</p>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="section-header"><h2>Frequently Asked <span className="gold-gradient-text">Questions</span></h2></div>
          {faqs.map((f, i) => (
            <div key={f.q} className="faq-item">
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                {f.q} <span>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
