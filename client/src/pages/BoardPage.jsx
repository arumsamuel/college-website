import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

export default function BoardPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api.get('/board').then(setMembers).catch(() => {});
  }, []);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Board of Governance' }]} />
      <PageHeader title="Board of " highlight="Governance" subtitle="Meet the Board of Trustees and review governance resources." />

      <section className="section-padding">
        <div className="container">
          <div className="section-header"><h2>Board of <span className="gold-gradient-text">Trustees</span></h2></div>
          <div className="engineer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            {members.map(m => (
              <div key={m.id} className="engineer-card">
                <div className="engineer-body">
                  <h3>{m.name}</h3>
                  <div className="badge badge-gold">{m.role}</div>
                  <p className="engineer-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>Meetings & <span className="gold-gradient-text">Governance</span></h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)' }}>
            <div className="dash-card">
              <h3>Meeting Schedule</h3>
              <ul className="contact-list">
                <li><strong>Monthly</strong><span>First Monday, 6:00 PM, Trustees Hall</span></li>
                <li><strong>Annual</strong><span>June 15, 2026</span></li>
                <li><strong>Public</strong><span>Meetings are open to the community</span></li>
              </ul>
            </div>
            <div className="dash-card">
              <h3>Minutes & Agendas</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>Approved minutes and upcoming agendas are archived here.</p>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <a href="#" className="btn btn-outline-dark btn-sm" onClick={e => e.preventDefault()}>📄 November Minutes</a>
                <a href="#" className="btn btn-outline-dark btn-sm" onClick={e => e.preventDefault()}>📄 December Agenda</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
