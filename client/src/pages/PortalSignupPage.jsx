import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import { useAuth } from '../context/AuthContext';

export default function PortalSignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [muted, setMuted] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', student_id: '', password: '', program: '', year: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(form);
      navigate('/portal/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Student Portal', to: '/portal/signin' }, { label: 'Sign Up' }]} />
      <PageHeader title="Create Your " highlight="Student Account" subtitle="Join the College student community and access your portal." />

      <section className="section-padding">
        <div className="container" style={{ maxWidth: 860 }}>
          {/* Intro video — skip always available */}
          {showIntro && (
            <div className="video-intro" style={{ marginBottom: 'var(--space-8)' }}>
              <video
                src="/assets/media/videos/intro/campus-intro.mp4"
                autoPlay
                muted={muted}
                loop
                playsInline
                poster="/assets/media/images/campus/campus-1.jpg"
                aria-label="Welcome video introducing College"
              >
                Your browser does not support the video tag.
              </video>
              <div className="video-controls">
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>🎓 Welcome to College — what to expect</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <button className="btn btn-outline-dark btn-sm" onClick={() => setMuted(m => !m)}>
                    {muted ? '🔊 Unmute' : '🔇 Mute'}
                  </button>
                  <button className="btn btn-gold btn-sm" onClick={() => setShowIntro(false)}>Skip Intro →</button>
                </div>
              </div>
            </div>
          )}

          <div className="form-card">
            <h2>Register as a Student</h2>
            {error && <div className="form-message error" role="alert">{error}</div>}
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <input id="name" name="name" className="form-control" required value={form.name} onChange={update} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input id="email" name="email" type="email" className="form-control" required value={form.email} onChange={update} />
                </div>
                <div className="form-group">
                  <label htmlFor="sid">Student ID <span className="required">*</span></label>
                  <input id="sid" name="student_id" className="form-control" required value={form.student_id} onChange={update} placeholder="e.g. S-2026-XXXX" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password <span className="required">*</span></label>
                <input id="password" name="password" type="password" className="form-control" required minLength={6} value={form.password} onChange={update} />
                <div className="form-hint">At least 6 characters.</div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="program">Program / Major <span className="required">*</span></label>
                  <select id="program" name="program" className="form-control" required value={form.program} onChange={update}>
                    <option value="">Select...</option>
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
                <div className="form-group">
                  <label htmlFor="year">Year <span className="required">*</span></label>
                  <select id="year" name="year" className="form-control" required value={form.year} onChange={update}>
                    <option value="">Select...</option>
                    <option value="1">First Year</option>
                    <option value="2">Sophomore</option>
                    <option value="3">Junior</option>
                    <option value="4">Senior</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-gold btn-block" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Already have an account? <Link to="/portal/signin" className="gold-text">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
