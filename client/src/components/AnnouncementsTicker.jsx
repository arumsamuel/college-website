import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function AnnouncementsTicker() {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    api.get('/announcements').then(setAnnouncements).catch(() => {});
  }, []);

  if (dismissed || announcements.length === 0) return null;

  return (
    <div className="ticker-bar" role="region" aria-label="Announcements">
      <div className="ticker-track">
        {announcements.map(a => (
          <span key={a.id} className={a.is_urgent ? 'urgent' : ''}>
            {a.is_urgent ? '🔔 ' : ''}{a.title}: {a.body}
          </span>
        ))}
      </div>
      <button className="ticker-dismiss" onClick={() => setDismissed(true)} aria-label="Dismiss announcements">
        ✕
      </button>
    </div>
  );
}
