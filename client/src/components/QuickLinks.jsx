import { Link } from 'react-router-dom';

const links = [
  { to: '/admissions', label: 'Apply Now' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/library', label: 'Library' },
  { to: '/portal/signin', label: 'Student Portal' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' }
];

export default function QuickLinks() {
  return (
    <div className="quick-links">
      <nav className="quick-links-inner" aria-label="Quick links">
        <span style={{ color: 'var(--gold)', fontWeight: 700 }}>Quick Links:</span>
        {links.map(l => (
          <Link key={l.to} to={l.to}>{l.label}</Link>
        ))}
      </nav>
    </div>
  );
}
