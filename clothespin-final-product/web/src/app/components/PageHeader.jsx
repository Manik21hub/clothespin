export default function PageHeader({ title, subtitle, actions, onBack }) {
  return (
    <header className="page-head">
      <div className="page-head-row">
        {onBack && (
          <button type="button" className="page-back" onClick={onBack} aria-label="Go back">
            ←
          </button>
        )}
        <div className="page-head-copy">
          {subtitle && <span className="page-eyebrow">{subtitle}</span>}
          <h1>{title}</h1>
        </div>
        {actions && <div className="page-actions">{actions}</div>}
      </div>
    </header>
  );
}
