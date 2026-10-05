import { useState, useMemo } from 'react';
import { ArrowRight, Play, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import JobCard from './components/JobCard.jsx';
import Footer from './components/Footer.jsx';
import ApplyModal from './components/ApplyModal.jsx';
import { roles, categories } from './data/roles.js';
import { translations } from './data/i18n.js';

/* SVG noise data-URI — same as real site */
const noiseSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E`;

/* Founder images */
const JURE_PHOTO = '/images/jure.jpg';
const URBAN_PHOTO = '/images/urban.jpg';

export default function App() {
  const [lang, setLang] = useState('sl');
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const [applyRole, setApplyRole] = useState(null);
  const [videoModal, setVideoModal] = useState(null);

  const t = translations[lang] || translations.sl;

  const filtered = useMemo(() =>
    filter === 'all' ? roles : roles.filter((r) => r.cat === filter),
    [filter]
  );

  const catCount = useMemo(() => {
    const map = {};
    roles.forEach((r) => { map[r.cat] = (map[r.cat] || 0) + 1; });
    return map;
  }, []);

  const activeRoles = filtered.filter((r) => r.active);
  const inactiveRoles = filtered.filter((r) => !r.active);

  return (
    <div className="pk-app" id="top">
      <Navbar lang={lang} setLang={setLang} />

      <main>
        {/* ══════════════════════════════════════════════════════
            1. HERO
            ══════════════════════════════════════════════════════ */}
        <section className="pk-hero" aria-labelledby="hero-heading">

          {/* Animated background */}
          <div className="pk-hero__bg" aria-hidden>
            <div className="pk-hero__bg-gradient" />
            <span
              className="pk-hero__noise"
              style={{ backgroundImage: `url("${noiseSvg}")` }}
            />
            <div className="pk-hero__beams">
              <span className="pk-hero__beam pk-hero__beam--a" />
              <span className="pk-hero__beam pk-hero__beam--b" />
              <span className="pk-hero__beam pk-hero__beam--c" />
              <span className="pk-hero__beam pk-hero__beam--d" />
            </div>
          </div>

          {/* Content */}
          <div className="pk-hero__content">
            {/* Live badge */}
            <span className="pk-hero__badge">
              <span className="pk-hero__badge-dot" aria-hidden>
                <span className="pk-hero__badge-ping" />
              </span>
              {t.hero.badge}&nbsp;<strong>{t.hero.badgeCount}</strong>
            </span>

            {/* H1 + sub */}
            <div className="pk-hero__heading-wrap">
              <h1 id="hero-heading" className="pk-hero__heading">
                {t.hero.headingStart}{' '}
                <span className="pk-hero__heading-gradient">{t.hero.headingHighlight}</span>
              </h1>
              <p className="pk-hero__sub">
                {t.hero.sub}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="pk-hero__ctas">
              <a href="#open-roles" className="pk-btn pk-btn--cta-primary">
                {t.hero.btnRoles}
                <ArrowRight size={16} aria-hidden />
              </a>
              <a href="#team" className="pk-btn pk-btn--secondary">
                {t.hero.btnTeam}
              </a>
            </div>

            {/* Metrics */}
            <div className="pk-hero__metrics">
              <div className="pk-hero__metric">
                <span className="pk-hero__metric-value">1M+</span>
                <span className="pk-hero__metric-label">{t.hero.users}</span>
              </div>
              <div className="pk-hero__metric-divider" aria-hidden />
              <div className="pk-hero__metric">
                <span className="pk-hero__metric-value">$1M+</span>
                <span className="pk-hero__metric-label">{t.hero.revenue}</span>
              </div>
              <div className="pk-hero__metric-divider" aria-hidden />
              <div className="pk-hero__metric">
                <span className="pk-hero__metric-value">5B+</span>
                <span className="pk-hero__metric-label">{t.hero.views}</span>
              </div>
            </div>
          </div>

          {/* YouTube video */}
          <div className="pk-hero__video-wrap">
            <iframe
              src="https://www.youtube.com/embed/qjuEeljTSZs?modestbranding=1&playsinline=1&rel=0"
              title="Pridruži se ekipi ParakeetAI!"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="pk-hero__video"
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            2. AI NATIVE
            ══════════════════════════════════════════════════════ */}
        <section id="ai-native" className="pk-section" aria-labelledby="ai-native-heading">
          <div className="pk-section__header">
            <h2 id="ai-native-heading" className="pk-section__heading">
              {t.aiNative.title}{' '}
              <span className="pk-heading-gradient">{t.aiNative.titleHighlight}</span>
            </h2>
            <p className="pk-section__sub">
              {t.aiNative.sub}
            </p>
          </div>

          {/* Terminal card */}
          <div className="pk-terminal">
            <div className="pk-terminal__bar">
              <span className="pk-terminal__dots" aria-hidden>
                <span className="pk-terminal__dot" />
                <span className="pk-terminal__dot" />
                <span className="pk-terminal__dot" />
              </span>
              <span className="pk-terminal__title">claude — parakeetai</span>
            </div>
            <div className="pk-terminal__body">
              <p className="pk-terminal__line pk-terminal__line--dim">
                <span className="pk-terminal__accent" aria-hidden>✻</span>
                Welcome to Claude Code
              </p>
              <p className="pk-terminal__line">
                <span className="pk-terminal__prompt" aria-hidden>&gt;</span>
                <span className="pk-terminal__input">{t.aiNative.terminalPrompt}</span>
              </p>
              <div className="pk-terminal__response">
                <p className="pk-terminal__line pk-terminal__line--response">
                  <span className="pk-terminal__accent" aria-hidden>⏺</span>
                  {t.aiNative.terminalRes}
                </p>
                <ul className="pk-terminal__list">
                  <li className="pk-terminal__list-item">
                    <span className="pk-terminal__tree" aria-hidden>⎿</span>
                    <span className="pk-terminal__list-text">
                      <span className="pk-terminal__list-bold">{t.aiNative.item1Title}</span>{' '}
                      {t.aiNative.item1Text}
                    </span>
                  </li>
                  <li className="pk-terminal__list-item">
                    <span className="pk-terminal__tree" aria-hidden>⎿</span>
                    <span className="pk-terminal__list-text">
                      <span className="pk-terminal__list-bold">{t.aiNative.item2Title}</span>{' '}
                      {t.aiNative.item2Text}
                    </span>
                  </li>
                </ul>
              </div>
              <p className="pk-terminal__caret" aria-hidden>
                <span className="pk-terminal__prompt">&gt;</span>
                <span className="pk-terminal__cursor" />
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            3. OPEN ROLES
            ══════════════════════════════════════════════════════ */}
        <section id="open-roles" className="pk-section" aria-labelledby="roles-heading">
          <div className="pk-section__header">
            <h2 id="roles-heading" className="pk-section__heading">
              {t.roles.title}{' '}
              <span className="pk-heading-gradient">{t.roles.titleHighlight}</span>
            </h2>
            <p className="pk-section__sub">
              {t.roles.sub}
            </p>
          </div>

          {/* Filter pills */}
          <div className="pk-filters" role="group" aria-label="Filtriraj mesta po kategoriji">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={filter === cat.id}
                className={`pk-filter ${filter === cat.id ? 'pk-filter--active' : ''}`}
                onClick={() => { setFilter(cat.id); setExpanded(null); }}
              >
                {lang === 'en' ? (cat.label === 'Vsa mesta' ? 'All Roles' : cat.label) : cat.label}
                <span style={{ opacity: filter === cat.id ? 1 : 0.6, marginLeft: 6 }}>
                  {cat.id === 'all' ? roles.length : (catCount[cat.id] || 0)}
                </span>
              </button>
            ))}
          </div>

          {/* Role cards list */}
          <div className="pk-roles-list">
            {/* Active hiring roles */}
            {activeRoles.map((role) => (
              <JobCard
                key={role.id}
                role={role}
                expanded={expanded === role.id}
                onToggle={() => setExpanded(expanded === role.id ? null : role.id)}
                onApply={setApplyRole}
                lang={lang}
              />
            ))}

            {/* Inactive roles divider */}
            {inactiveRoles.length > 0 && (
              <div className="pk-roles-divider">
                <span className="pk-roles-divider__title">{t.roles.dividerTitle}</span>
                <p className="pk-roles-divider__sub">
                  {t.roles.dividerSub}
                </p>
              </div>
            )}

            {/* Inactive role cards */}
            {inactiveRoles.map((role) => (
              <JobCard
                key={role.id}
                role={role}
                expanded={expanded === role.id}
                onToggle={() => setExpanded(expanded === role.id ? null : role.id)}
                onApply={setApplyRole}
                lang={lang}
              />
            ))}

            {/* Open application banner */}
            <div className="pk-open-apply-card">
              <div className="pk-open-apply-left">
                <p className="pk-open-apply-text">
                  {t.roles.openApplyText}
                </p>
                <p className="pk-open-apply-sub">
                  {t.roles.openApplySub}{' '}
                  <a href="mailto:hiring@parakeet-ai.com">hiring@parakeet-ai.com</a>.
                </p>
              </div>
              <button
                type="button"
                className="pk-btn pk-btn--primary"
                onClick={() => setApplyRole({ title: lang === 'en' ? 'Open Application' : 'Odprta prijava' })}
              >
                {t.roles.openApplyBtn}
                <ArrowRight size={16} aria-hidden />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            4. FOOD (Kosilo je na nas)
            ══════════════════════════════════════════════════════ */}
        <section id="food" className="pk-section" aria-labelledby="food-heading">
          <div className="pk-section__header">
            <h2 id="food-heading" className="pk-section__heading">
              {lang === 'en' ? 'Lunch is' : 'Kosilo je'}{' '}
              <span className="pk-heading-gradient">{lang === 'en' ? 'on us' : 'na nas'}</span>
            </h2>
            <p className="pk-section__sub">
              {lang === 'en'
                ? 'Order whatever you want, delivery comes to the office and the bill goes to the company.'
                : 'Naročiš, kar hočeš, dostava pride v pisarno in račun gre na podjetje.'}
            </p>
          </div>

          {/* Wolt Cyan Card */}
          <div className="pk-wolt-card">
            <div className="pk-wolt-card__left">
              <h3 className="pk-wolt-card__title">{lang === 'en' ? '€30 / day' : '€30 na dan'}</h3>
              <p className="pk-wolt-card__sub">{t.why.perk1Desc}</p>
            </div>
            <div className="pk-wolt-card__logo" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/images/wolt-logo.png"
                alt="Wolt"
                style={{ height: '32px', width: 'auto', display: 'block' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.textContent = 'Wolt';
                }}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            WHY PARAKEETAI? (Unified Perks Grid)
            ══════════════════════════════════════════════════════ */}
        <section id="why" className="pk-section" aria-labelledby="why-heading">
          <div className="pk-section__header">
            <h2 id="why-heading" className="pk-section__heading">
              {t.why.title}{' '}
              <span className="pk-heading-gradient">{t.why.titleHighlight}</span>
            </h2>
            <p className="pk-section__sub">{t.why.sub}</p>
          </div>

          <div className="pk-why-grid">
            <div className="pk-why-card">
              <div className="pk-why-icon"><Zap size={24} color="#16a34a" /></div>
              <h3 className="pk-why-card__title">{t.why.perk1Title}</h3>
              <p className="pk-why-card__desc">{t.why.perk1Desc}</p>
            </div>

            <div className="pk-why-card">
              <div className="pk-why-icon"><ShieldCheck size={24} color="#16a34a" /></div>
              <h3 className="pk-why-card__title">{t.why.perk2Title}</h3>
              <p className="pk-why-card__desc">{t.why.perk2Desc}</p>
            </div>

            <div className="pk-why-card">
              <div className="pk-why-icon"><Sparkles size={24} color="#16a34a" /></div>
              <h3 className="pk-why-card__title">{t.why.perk3Title}</h3>
              <p className="pk-why-card__desc">{t.why.perk3Desc}</p>
            </div>

            <div className="pk-why-card">
              <div className="pk-why-icon"><Globe size={24} color="#16a34a" /></div>
              <h3 className="pk-why-card__title">{t.why.perk4Title}</h3>
              <p className="pk-why-card__desc">{t.why.perk4Desc}</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            5. PROCESS SECTION (Kako poteka izbor)
            ══════════════════════════════════════════════════════ */}
        <section className="pk-section" aria-labelledby="process-heading">
          <div className="pk-section__header">
            <h2 id="process-heading" className="pk-section__heading">
              {t.process.title}{' '}
              <span className="pk-heading-gradient">{t.process.titleHighlight}</span>
            </h2>
            <p className="pk-section__sub">
              {t.process.sub}
            </p>
          </div>

          <div className="pk-process-card">
            <p className="pk-process-card__text">
              {t.process.desc}
            </p>
            <ol className="pk-process-steps">
              <li className="pk-process-step">
                <span className="pk-process-step__num">1.</span>
                <span className="pk-process-step__title">{t.process.step1}</span>
                <span className="pk-process-step__time">{t.process.step1Time}</span>
              </li>
              <li className="pk-process-step">
                <span className="pk-process-step__num">2.</span>
                <span className="pk-process-step__title">{t.process.step2}</span>
                <span className="pk-process-step__time">{t.process.step2Time}</span>
              </li>
              <li className="pk-process-step">
                <span className="pk-process-step__num">3.</span>
                <span className="pk-process-step__title">{t.process.step3}</span>
                <span className="pk-process-step__time">{t.process.step3Time}</span>
              </li>
            </ol>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            6. AI INTERVIEW SECTION (AI na razgovoru? Seveda.)
            ══════════════════════════════════════════════════════ */}
        <section id="ai-interview" className="pk-section" aria-labelledby="ai-interview-heading">
          <div className="pk-section__header">
            <h2 id="ai-interview-heading" className="pk-section__heading">
              {t.aiInterview.title}{' '}
              <span className="pk-heading-gradient">{t.aiInterview.titleHighlight}</span>
            </h2>
            <p className="pk-section__sub">
              {t.aiInterview.sub}
            </p>
          </div>

          <div className="pk-ai-card">
            <h3 className="pk-ai-card__title">{t.aiInterview.cardTitle}</h3>
            <p className="pk-ai-card__text">
              {t.aiInterview.cardDesc}
            </p>
            <ul className="pk-ai-pills">
              {['ChatGPT', 'Claude', 'Cursor', 'Gemini', 'ParakeetAI'].map((p) => (
                <li key={p} className="pk-ai-pill">{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            7. SPOZNAJ FOUNDERJA
            ══════════════════════════════════════════════════════ */}
        <section id="team" className="pk-section" aria-labelledby="team-heading">
          <div className="pk-section__header">
            <h2 id="team-heading" className="pk-section__heading">
              {t.team.title}{' '}
              <span className="pk-heading-gradient">{t.team.titleHighlight}</span>
            </h2>
            <p className="pk-section__sub">
              {t.team.sub}
            </p>
          </div>

          {/* Founders Grid */}
          <div className="pk-founders-grid">
            {/* Jure */}
            <div className="pk-founder-card">
              <img
                src={JURE_PHOTO}
                alt="Jure Sotosek"
                className="pk-founder-avatar"
                onError={(e) => { e.target.style.background = '#e4e4e7'; }}
              />
              <div className="pk-founder-info">
                <h3 className="pk-founder-name">Jure Sotosek</h3>
                <span className="pk-founder-title">Founder &amp; CEO</span>
                <span className="pk-founder-ex">
                  ex{' '}
                  <a href="https://www.microsoft.com" target="_blank" rel="noreferrer">Microsoft</a>,{' '}
                  <a href="https://whop.com" target="_blank" rel="noreferrer">Whop</a>,{' '}
                  <a href="https://www.wrumersound.com" target="_blank" rel="noreferrer">WrumerSound</a>
                </span>
                <div className="pk-founder-socials">
                  <a href="https://x.com/juresotosek" target="_blank" rel="noreferrer" className="pk-founder-social" aria-label="Jure on X">
                    X
                  </a>
                  <a href="https://www.linkedin.com/in/juresotosek/" target="_blank" rel="noreferrer" className="pk-founder-social" aria-label="Jure on LinkedIn">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Urban */}
            <div className="pk-founder-card">
              <img
                src={URBAN_PHOTO}
                alt="Urban Peklar"
                className="pk-founder-avatar"
                onError={(e) => { e.target.style.background = '#e4e4e7'; }}
              />
              <div className="pk-founder-info">
                <h3 className="pk-founder-name">Urban Peklar</h3>
                <span className="pk-founder-title">Founder &amp; CMO</span>
                <span className="pk-founder-ex">
                  ex{' '}
                  <a href="https://www.wrumersound.com" target="_blank" rel="noreferrer">WrumerSound</a>
                </span>
                <div className="pk-founder-socials">
                  <a href="https://x.com/urbanpeklar" target="_blank" rel="noreferrer" className="pk-founder-social" aria-label="Urban on X">
                    X
                  </a>
                  <a href="https://www.linkedin.com/in/urban-peklar/" target="_blank" rel="noreferrer" className="pk-founder-social" aria-label="Urban on LinkedIn">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Podcasts & Interviews */}
          <div className="pk-open-apply-card" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{t.team.podcastsTitle}</h3>
            <div className="pk-podcasts-grid">
              {[
                { id: 'tJtXw4TVdcw', title: 'Founders Talk podcast' },
                { id: 'X3hvkUiXScA', title: 'Zakulisje podcast' },
                { id: 'KpVPST_P4W8', title: 'Podcast appearance' },
                { id: 'YnY_A4Oy_nY', title: 'Podcast appearance' },
                { id: 'gnahoeeUy6I', title: 'Podim' },
              ].map((vid) => (
                <button
                  key={vid.id}
                  type="button"
                  className="pk-podcast-card"
                  onClick={() => setVideoModal(vid.id)}
                  aria-label={`Play: ${vid.title}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                    alt={vid.title}
                    className="pk-podcast-thumb"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://i3.ytimg.com/vi/${vid.id}/hqdefault.jpg`;
                    }}
                  />
                  <div className="pk-podcast-play">
                    <Play size={18} fill="currentColor" />
                  </div>
                </button>
              ))}

              {/* Starter Story link */}
              <a
                href="https://www.starterstory.com/stories/parakeetai"
                target="_blank"
                rel="noreferrer"
                className="pk-podcast-card"
                style={{
                  background: '#f4f4f5',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  textDecoration: 'none',
                  color: '#0a0a0a',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#71717a', fontWeight: 600 }}>
                    {lang === 'en' ? 'Article' : 'Članek'}
                  </span>
                  <ArrowUpRight size={16} color="#71717a" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3 }}>
                  {lang === 'en' ? 'Our story on Starter Story' : 'Naša zgodba na Starter Story'}
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            8. LIFESTYLE (ParakeetAI lifestyle)
            ══════════════════════════════════════════════════════ */}
        <section id="life" className="pk-section" aria-labelledby="life-heading">
          <div className="pk-section__header">
            <h2 id="life-heading" className="pk-section__heading">
              {t.life.title}{' '}
              <span className="pk-heading-gradient">{t.life.titleHighlight}</span>
            </h2>
            <p className="pk-section__sub">
              {t.life.sub}
            </p>
          </div>

          <div className="pk-lifestyle-grid">
            {/* Card 1: Company Trips */}
            <div className="pk-lifestyle-card">
              <img
                src="https://img.youtube.com/vi/PwN2eLjXjz4/hqdefault.jpg"
                alt="Tajska team trip"
                className="pk-lifestyle-card__bg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://i3.ytimg.com/vi/PwN2eLjXjz4/hqdefault.jpg';
                }}
              />
              <div className="pk-lifestyle-card__overlay" />
              <span className="pk-lifestyle-card__badge">{lang === 'en' ? 'Thailand' : 'Tajska'}</span>
              <div className="pk-lifestyle-card__bottom">
                <div className="pk-lifestyle-card__text">
                  <h3 className="pk-lifestyle-card__title">{t.life.card1Title}</h3>
                  <p className="pk-lifestyle-card__sub">{t.life.card1Sub}</p>
                </div>
                <button
                  type="button"
                  className="pk-podcast-play"
                  style={{ position: 'relative', flexShrink: 0 }}
                  onClick={() => setVideoModal('PwN2eLjXjz4')}
                  aria-label="Play Thailand video"
                >
                  <Play size={20} fill="currentColor" />
                </button>
              </div>
            </div>

            {/* Card 2: In office culture */}
            <div className="pk-lifestyle-card">
              <img
                src="/images/office.jpeg"
                alt="Pisarna, Ljubljana"
                className="pk-lifestyle-card__bg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://www.parakeet-ai.com/_next/image?url=%2F_next%2Fstatic%2Fimmutable%2Fmedia%2Foffice-watch-party.3limzbxq13yfg.jpeg&w=1200&q=75';
                }}
              />
              <div className="pk-lifestyle-card__overlay" />
              <span className="pk-lifestyle-card__badge">{lang === 'en' ? 'Office, Ljubljana' : 'Pisarna, Ljubljana'}</span>
              <div className="pk-lifestyle-card__bottom">
                <div className="pk-lifestyle-card__text">
                  <h3 className="pk-lifestyle-card__title">{t.life.card2Title}</h3>
                  <p className="pk-lifestyle-card__sub">{t.life.card2Sub}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            9. PRE-FOOTER CTA SECTION (Se ti zdi zanimivo? Prijavi se.)
            ══════════════════════════════════════════════════════ */}
        <section className="pk-prefooter-cta" aria-labelledby="prefooter-heading">
          <h2 id="prefooter-heading" className="pk-prefooter-cta__title">
            {t.cta.title}<br />
            <span className="pk-prefooter-cta__gradient">{t.cta.titleHighlight}</span>
          </h2>
          <p className="pk-prefooter-cta__sub">
            {t.cta.sub}
          </p>
          <button
            type="button"
            className="pk-btn pk-btn--cta-primary"
            onClick={() => setApplyRole({ title: lang === 'en' ? 'Open Application' : 'Odprta prijava' })}
          >
            {t.cta.btn}
            <ArrowRight size={16} aria-hidden />
          </button>
        </section>
      </main>

      {/* Dark Footer (#18181b) */}
      <Footer lang={lang} />

      {/* Apply modal */}
      <ApplyModal role={applyRole} onClose={() => setApplyRole(null)} lang={lang} />

      {/* Video Modal if clicked */}
      {videoModal && (
        <div className="pk-modal" onClick={() => setVideoModal(null)}>
          <div
            className="pk-modal__box"
            style={{ width: 'min(800px, 95vw)', padding: 0, background: '#000', overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoModal}?autoplay=1`}
              title="YouTube video player"
              style={{ width: '100%', height: '450px', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
