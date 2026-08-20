import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

export default function LibraryPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const qs = query ? `?q=${encodeURIComponent(query)}` : '';
    api.get(`/library${qs}`).then(setItems).catch(() => {});
  }, [query]);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Library' }]} />
      <PageHeader title="Library & " highlight="Media Center" subtitle="Digital catalog, research tools, borrowing policies, and hours." />

      <section className="section-padding">
        <div className="container">
          <div className="dash-card" style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
              <div>
                <h3>Hours</h3>
                <ul className="contact-list">
                  <li><strong>Mon–Fri</strong><span>8:00 AM – 10:00 PM</span></li>
                  <li><strong>Sat–Sun</strong><span>10:00 AM – 6:00 PM</span></li>
                  <li><strong>Exam Week</strong><span>Open until midnight</span></li>
                </ul>
              </div>
              <div>
                <h3>Borrowing Policies</h3>
                <ul className="contact-list">
                  <li><strong>Books</strong><span>14-day loan, 2 renewals</span></li>
                  <li><strong>Laptops</strong><span>4-hour in-library loan</span></li>
                  <li><strong>Course Reserves</strong><span>2-hour in-library use</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="section-header"><h2>Research <span className="gold-gradient-text">Tools</span></h2></div>
          <div className="summary-cards" style={{ marginBottom: 'var(--space-12)' }}>
            <div className="feature-card"><h3>📚 JSTOR</h3><p>Full-text academic journal archive.</p></div>
            <div className="feature-card"><h3>🔬 PubMed</h3><p>Biomedical and life sciences database.</p></div>
            <div className="feature-card"><h3>📈 EBSCO</h3><p>Business, education, and general research.</p></div>
          </div>

          <div className="section-header"><h2>Digital <span className="gold-gradient-text">Catalog</span></h2></div>
          <div className="dash-card" style={{ marginBottom: 'var(--space-6)' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="libsearch">Search the Catalog</label>
              <input id="libsearch" className="form-control" placeholder="Search by title or author..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="table-wrapper">
            <table className="db-table">
              <thead><tr><th>Title</th><th>Author</th><th>Type</th><th>Location</th><th>Status</th></tr></thead>
              <tbody>
                {items.map(i => (
                  <tr key={i.id}>
                    <td><strong>{i.title}</strong></td>
                    <td>{i.author || '—'}</td>
                    <td>{i.type}</td>
                    <td>{i.location}</td>
                    <td>{i.available ? <span className="badge badge-success">Available</span> : <span className="badge badge-error">Checked Out</span>}</td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan="5" className="empty-state">No items found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
