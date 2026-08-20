import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (q) {
      api.get(`/search?q=${encodeURIComponent(q)}`).then(setResults).catch(() => {});
    }
  }, [q]);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Search' }]} />
      <PageHeader title="Search " highlight="Results" subtitle={q ? `Results for "${q}"` : 'Type a search query.'} />

      <section className="section-padding">
        <div className="container">
          {!results && <div className="loading-spinner"><div className="spinner" role="status"><span className="sr-only">Loading</span></div></div>}
          {results && (
            <>
              {results.news?.length > 0 && (
                <div className="dash-card" style={{ marginBottom: 'var(--space-6)' }}>
                  <h3>📰 News</h3>
                  {results.news.map(n => (
                    <Link key={n.id} to="/news" className="engineer-contact" style={{ marginTop: 8 }}>
                      <span>{n.title}</span>
                    </Link>
                  ))}
                </div>
              )}
              {results.staff?.length > 0 && (
                <div className="dash-card" style={{ marginBottom: 'var(--space-6)' }}>
                  <h3>👥 Staff</h3>
                  {results.staff.map(s => (
                    <Link key={s.id} to="/staff-directory" className="engineer-contact" style={{ marginTop: 8 }}>
                      <span>{s.name} — {s.title}</span>
                    </Link>
                  ))}
                </div>
              )}
              {results.events?.length > 0 && (
                <div className="dash-card" style={{ marginBottom: 'var(--space-6)' }}>
                  <h3>📅 Events</h3>
                  {results.events.map(e => (
                    <Link key={e.id} to="/calendar" className="engineer-contact" style={{ marginTop: 8 }}>
                      <span>{e.title}</span>
                    </Link>
                  ))}
                </div>
              )}
              {results.library?.length > 0 && (
                <div className="dash-card" style={{ marginBottom: 'var(--space-6)' }}>
                  <h3>📚 Library</h3>
                  {results.library.map(l => (
                    <Link key={l.id} to="/library" className="engineer-contact" style={{ marginTop: 8 }}>
                      <span>{l.title}</span>
                    </Link>
                  ))}
                </div>
              )}
              {!results.news?.length && !results.staff?.length && !results.events?.length && !results.library?.length && (
                <div className="empty-state">
                  <h3>No results for "{q}"</h3>
                  <p>Try a different search term, or browse the site navigation above.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
