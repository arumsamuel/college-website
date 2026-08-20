export default function PageHeader({ title, highlight, subtitle, children }) {
  return (
    <div className="page-header">
      <h1>
        {title} {highlight && <span className="gold-text">{highlight}</span>}
      </h1>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
}
