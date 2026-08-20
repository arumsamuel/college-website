import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }
    const t = setTimeout(() => {
      api.get(`/search?q=${encodeURIComponent(query)}`).then(setResults).catch(() => {});
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  function submit(e) {
    e.preventDefault();
    if (query.trim()) {
      setOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <div className="search-wrap" ref={wrapRef}>
      <form onSubmit={submit} role="search">
        <input
          className="search-input"
          type="search"
          placeholder="Search campus..."
          aria-label="Search"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
      </form>
      {open && results && query.trim() && (
        <div className="search-results">
          {results.news?.length > 0 && (
            <>
              <div className="group-label">News</div>
              {results.news.slice(0, 3).map(n => (
                <a key={n.id} href="/news" onClick={() => setOpen(false)}>{n.title}</a>
              ))}
            </>
          )}
          {results.staff?.length > 0 && (
            <>
              <div className="group-label">Staff</div>
              {results.staff.slice(0, 3).map(s => (
                <a key={s.id} href="/staff-directory" onClick={() => setOpen(false)}>{s.name} — {s.title}</a>
              ))}
            </>
          )}
          {results.events?.length > 0 && (
            <>
              <div className="group-label">Events</div>
              {results.events.slice(0, 3).map(e => (
                <a key={e.id} href="/events" onClick={() => setOpen(false)}>{e.title}</a>
              ))}
            </>
          )}
          {results.library?.length > 0 && (
            <>
              <div className="group-label">Library</div>
              {results.library.slice(0, 3).map(l => (
                <a key={l.id} href="/library" onClick={() => setOpen(false)}>{l.title}</a>
              ))}
            </>
          )}
          {!results.news?.length && !results.staff?.length && !results.events?.length && !results.library?.length && (
            <div className="empty-state" style={{ padding: 'var(--space-6)' }}>No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}
