import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

const departments = [
  'Admissions', 'Registrar', 'Financial Aid', 'Student Affairs', 'Athletics', 'Housing', 'Dining', 'IT Support', 'Webmaster'
];

const contactInfo = [
  { label: 'Address', value: '100 University Avenue, Springfield, IL 62701' },
  { label: 'Main Phone', value: '+1 (555) 010-2000' },
  { label: 'General Email', value: 'info@college.edu' },
  { label: 'Admissions', value: 'admissions@college.edu' },
  { label: 'Office Hours', value: 'Mon–Fri, 8:00 AM – 5:00 PM' }
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', department: '', subject: '', message: '' });
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    setError(null);
    try {
      const data = await api.post('/contact', form);
      setMsg(data.message);
      setForm({ name: '', email: '', department: '', subject: '', message: '' });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <PageHeader title="Contact " highlight="Us" subtitle="We're here to help. Reach out through the form or the details below." />

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-8)' }}>
            <div>
              <div className="dash-card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3>Contact Information</h3>
                <ul className="contact-list">
                  {contactInfo.map(ci => (
                    <li key={ci.label}><strong>{ci.label}</strong><span>{ci.value}</span></li>
                  ))}
                </ul>
              </div>
              <div className="dash-card">
                <h3>Our Location</h3>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', background: 'var(--bg-card-alt)', textAlign: 'center', padding: 'var(--space-6)' }}>
                  <div style={{ fontSize: 'var(--text-5xl)' }}>📍</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 8 }}>100 University Avenue, Springfield, IL 62701</p>
                  <a href="https://maps.google.com/?q=100+University+Avenue+Springfield+IL" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm">Open in Google Maps</a>
                </div>
              </div>
            </div>

            <div className="form-card">
              <h2>Send a Message</h2>
              {msg && <div className="form-message success" role="status">{msg}</div>}
              {error && <div className="form-message error" role="alert">{error}</div>}
              <form onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cname">Name <span className="required">*</span></label>
                    <input id="cname" name="name" className="form-control" required value={form.name} onChange={update} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cemail">Email <span className="required">*</span></label>
                    <input id="cemail" name="email" type="email" className="form-control" required value={form.email} onChange={update} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cdep">Department <span className="required">*</span></label>
                  <select id="cdep" name="department" className="form-control" required value={form.department} onChange={update}>
                    <option value="">Select a department...</option>
                    {departments.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="csubj">Subject <span className="required">*</span></label>
                  <input id="csubj" name="subject" className="form-control" required value={form.subject} onChange={update} />
                </div>
                <div className="form-group">
                  <label htmlFor="cmsg">Message <span className="required">*</span></label>
                  <textarea id="cmsg" name="message" className="form-control" required value={form.message} onChange={update} />
                </div>
                <button type="submit" className="btn btn-gold btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
