import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setMsg(null);
    setLoading(true);
    try {
      const data = await api.post('/auth/forgot-password', { email });
      setMsg(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Student Portal', to: '/portal/signin' }, { label: 'Forgot Password' }]} />
      <PageHeader title="Reset Your " highlight="Password" subtitle="Enter your email and we'll send you a reset link." />

      <section className="section-padding">
        <div className="container" style={{ maxWidth: 520 }}>
          <div className="form-card">
            <h2>Forgot Password</h2>
            {msg && <div className="form-message success" role="status">{msg}</div>}
            {error && <div className="form-message error" role="alert">{error}</div>}
            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input id="email" name="email" type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-gold btn-block" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              Remembered it? <Link to="/portal/signin" className="gold-text">Back to sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
