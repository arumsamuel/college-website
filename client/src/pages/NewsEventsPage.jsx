import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Breadcrumbs from '../components/Breadcrumbs';
import api from '../lib/api';

const newsCategories = ['All', 'Campus', 'Research', 'Athletics', 'Arts'];

export default function NewsEventsPage() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';
  const [newsCat, setNewsCat] = useState(initialCat);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/news').then(setNews).catch(() => {});
  }, []);

  useEffect(() => {
    api.get('/events').then(setEvents).catch(() => {});
  }, []);

  const filteredNews = newsCat === 'All' ? news : news.filter(n => n.category === newsCat);
  const [evCat, setEvCat] = useState('All');
  const eventCats = ['All', ...new Set(events.map(e => e.category))];
  const filteredEvents = evCat === 'All' ? events : events.filter(e => e.category === evCat);

  return (
    <>
      <Breadcrumbs items={[{ label: 'News & Events' }]} />
      <PageHeader title="News & " highlight="Events" subtitle="Stay up to date with the latest from College — news, press, calendars, and galleries." />

      {/* News feed */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header"><h2>Latest <span className="gold-gradient-text">News</span></h2></div>
          <div className="chip-row" role="tablist" aria-label="Filter news by category">
            {newsCategories.map(c => (
              <button key={c} className={`chip ${newsCat === c ? 'active' : ''}`} onClick={() => setNewsCat(c)}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            {filteredNews.map(n => (
              <article key={n.id} className="news-card">
                <img src={n.image_path || '/assets/media/images/news/news-1.jpg'} alt={n.title} loading="lazy" onError={e => { e.target.style.display = 'none'; }} />
                <div className="news-card-body">
                  <span className="badge badge-gold">{n.category}</span>
                  <h3 style={{ marginTop: 8 }}>{n.title}</h3>
                  <p>{n.summary}</p>
                </div>
              </article>
            ))}
            {filteredNews.length === 0 && <div className="empty-state">No news in this category yet.</div>}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header"><h2>Upcoming <span className="gold-gradient-text">Events</span></h2><p>Filter by category or see the full <Link to="/calendar" className="gold-text">academic calendar</Link>.</p></div>
          <div className="chip-row" role="tablist" aria-label="Filter events by category">
            {eventCats.map(c => (
              <button key={c} className={`chip ${evCat === c ? 'active' : ''}`} onClick={() => setEvCat(c)}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
            {filteredEvents.map(e => (
              <div key={e.id} className="event-card">
                <div className="event-card-body">
                  <span className="badge badge-info">{e.category}</span>
                  <h3 style={{ marginTop: 8 }}>{e.title}</h3>
                  <p style={{ marginTop: 8 }}>📅 {new Date(e.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  {e.location && <p>📍 {e.location}</p>}
                  <p>{e.description}</p>
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && <div className="empty-state">No events in this category.</div>}
          </div>
        </div>
      </section>
    </>
  );
}
