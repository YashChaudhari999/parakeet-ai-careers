import { Plus, ArrowRight } from 'lucide-react';

function RichLine({ item }) {
  if (item.plain) return <span>{item.plain}</span>;
  if (item.segments) {
    return (
      <span>
        {item.segments.map((s, idx) => (
          <span key={idx} className={s.bold ? 'pk-role__bold' : undefined}>
            {s.text}
          </span>
        ))}
      </span>
    );
  }
  // Fallback for pre/bold/post
  return (
    <span>
      {item.pre && <span>{item.pre}</span>}
      {item.bold && <span className="pk-role__bold">{item.bold}</span>}
      {item.post && <span>{item.post}</span>}
    </span>
  );
}

function RoleSection({ label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="pk-role__section">
      <h4 className="pk-role__section-title">{label}</h4>
      <ul className="pk-role__list">
        {items.map((item, i) => (
          <li key={i} className="pk-role__list-item">
            <span className="pk-role__bullet" aria-hidden />
            <RichLine item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function catLabel(cat) {
  return cat === 'product' ? 'Product & Design'
    : cat === 'engineering' ? 'Engineering'
    : cat === 'marketing' ? 'Marketing'
    : 'Operations';
}

export default function JobCard({ role, expanded, onToggle, onApply, lang = 'sl' }) {
  const isEn = lang === 'en';
  const r = (isEn && role.en) ? { ...role, ...role.en } : role;

  return (
    <div
      id={r.id}
      className={`pk-role ${expanded ? 'pk-role--expanded' : ''}`}
    >
      {/* ── Header ────────────────────────────────────────────── */}
      <button
        type="button"
        aria-expanded={expanded}
        className="pk-role__head"
        onClick={onToggle}
      >
        <div className="pk-role__head-content">
          <div className="pk-role__title-row">
            <h3 className="pk-role__title">{r.title}</h3>
            <span className="pk-role__cat-pill">
              {r.rawCat ? r.rawCat.replace(/&amp;/g, '&') : catLabel(r.cat)}
            </span>
            {r.inactive && (
              <span className="pk-role__cat-pill pk-role__cat-pill--inactive">
                {isEn ? 'Currently Not Hiring' : 'Trenutno ne zaposlujemo'}
              </span>
            )}
          </div>
          {r.summary && <p className="pk-role__summary">{r.summary}</p>}

          {/* Structured Metadata Badges */}
          <div className="pk-role__meta">
            <span className="pk-role__meta-badge pk-role__meta-badge--location">{r.location}</span>
            <span className="pk-role__meta-badge">{r.type}</span>
            <span className="pk-role__meta-badge pk-role__meta-badge--salary">{r.salary}</span>
            {r.perks && r.perks.map((p) => (
              <span key={p} className="pk-role__meta-badge pk-role__meta-badge--green">{p}</span>
            ))}
            <span className="pk-role__meta-badge pk-role__meta-badge--reloc">
              {isEn ? 'EU Visa & Relocation Support' : 'Vize in pomoč pri selitvi'}
            </span>
          </div>
        </div>
        
        <div className="pk-role__head-actions" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="pk-btn pk-btn--primary pk-role__quick-apply"
            onClick={() => onApply(r)}
          >
            {isEn ? 'Apply' : 'Prijavi se'}
            <ArrowRight size={14} aria-hidden />
          </button>
          <Plus
            size={24}
            className="pk-role__plus"
            aria-hidden
            onClick={onToggle}
          />
        </div>
      </button>

      {/* ── Body (accordion) ──────────────────────────────────── */}
      <div className={`pk-role__body-wrap ${expanded ? 'pk-role__body-wrap--open' : ''}`}>
        <div className="pk-role__body">
          <div className="pk-role__body-inner">

            {/* Dynamic sections */}
            {r.sections && r.sections.map((sec, idx) => (
              <RoleSection key={idx} label={sec.title} items={sec.items} />
            ))}

            {/* Apply box */}
            <div className="pk-role__apply-box">
              <div className="pk-role__apply-left">
                <h4 className="pk-role__apply-title">
                  {isEn ? 'In the application form we ask for:' : 'V obrazcu te vprašamo za:'}
                </h4>
                <ol className="pk-role__apply-list">
                  {r.applyAsk && r.applyAsk.map((item, i) => (
                    <li key={i} className="pk-role__apply-item">
                      <span className="pk-role__apply-num">{i + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="pk-role__apply-right">
                <button
                  className="pk-btn pk-btn--primary"
                  onClick={(e) => { e.stopPropagation(); onApply(r); }}
                >
                  {isEn ? 'Apply for this position' : 'Prijavi se na to mesto'}
                  <ArrowRight size={16} aria-hidden />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
