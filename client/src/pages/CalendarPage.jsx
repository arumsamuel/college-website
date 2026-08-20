import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

function toICal(events) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//College//Calendar//EN'
  ];
  for (const e of events) {
    const start = (e.date || '').replace(/-/g, '');
    const end = e.end_date ? (e.end_date || '').replace(/-/g, '') : start;
    lines.push('BEGIN:VEVENT');
    lines.push(`SUMMARY:${e.title}`);
    if (e.location) lines.push(`LOCATION:${e.location}`);
    lines.push(`DTSTART;VALUE=DATE:${start}`);
    if (e.end_date) lines.push(`DTEND;VALUE=DATE:${end}`);
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/events').then(rows => {
      setEvents(rows);
      setCategories(['All', ...new Set(rows.map(e => e.category))]);
    }).catch(() => {});
  }, []);

  const filtered = category === 'All' ? events : events.filter(e => e.category === category);

  function exportICal() {
    const blob = new Blob([toICal(filtered)], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'college-calendar.ics';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Breadcrumbs items={[{ label: 'Calendar' }]} />
      <PageHeader title="Academic " highlight="Calendar" subtitle="Holidays, exams, early dismissals, and sports — filterable and exportable." />

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
            <div className="chip-row" style={{ marginBottom: 0 }}>
              {categories.map(c => (
                <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
            <button className="btn btn-gold btn-sm" onClick={exportICal}>Export iCal</button>
          </div>

          <div className="table-wrapper">
            <table className="db-table">
              <thead><tr><th>Date</th><th>Event</th><th>Category</th><th>Location</th></tr></thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id}>
                    <td><strong>{new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</strong></td>
                    <td>{e.title}</td>
                    <td><span className="badge badge-info">{e.category}</span></td>
                    <td>{e.location || '—'}</td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan="4" className="empty-state">No events in this category.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
