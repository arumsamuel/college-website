import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';

export default function PortalSigninPage() {
  const { student, signin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (student) return <Navigate to="/portal/dashboard" replace />;

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signin(form.email, form.password);
      navigate('/portal/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function useDemo() {
    setForm({ email: DEMO_CREDENTIALS.email, password: DEMO_CREDENTIALS.password });
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Student Portal', to: '/portal/signin' }, { label: 'Sign In' }]} />
      <PageHeader title="Student " highlight="Portal Sign In" subtitle="Access your grades, attendance, homework, and courses." />

      <section className="section-padding">
        <div className="container" style={{ maxWidth: 520 }}>
          <div className="form-card">
            <h2>Sign In</h2>
            {error && <div className="form-message error" role="alert">{error}</div>}
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="email">Email <span className="required">*</span></label>
                <input id="email" name="email" type="email" className="form-control" required value={form.email} onChange={update} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password <span className="required">*</span></label>
                <input id="password" name="password" type="password" className="form-control" required value={form.password} onChange={update} />
              </div>
              <button type="submit" className="btn btn-gold btn-block" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div style={{ margin: 'var(--space-5) 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
              <Link to="/portal/forgot-password" className="gold-text">Forgot password?</Link>
            </div>

            <div className="disclaimer" style={{ marginBottom: 'var(--space-5)' }}>
              <span>🎫</span>
              <span>
                <strong>Try the demo account</strong> to explore every portal feature without registering.<br />
                Email: <strong>{DEMO_CREDENTIALS.email}</strong> · Password: <strong>{DEMO_CREDENTIALS.password}</strong>
              </span>
            </div>
            <button className="btn btn-outline-dark btn-block" onClick={useDemo}>Try Demo Account</button>

            <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              New student? <Link to="/portal/signup" className="gold-text">Create an account</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
