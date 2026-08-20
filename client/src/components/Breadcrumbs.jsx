import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((it, i) => (
        <span key={i}>
          <span className="sep">›</span>
          {it.to && i < items.length - 1 ? (
            <Link to={it.to}>{it.label}</Link>
          ) : (
            <span aria-current="page">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
