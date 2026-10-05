import { useState, useEffect } from 'react';
import { ChevronDown, BookOpen, Bot, Contact, Aperture } from 'lucide-react';

export default function Navbar({ lang = 'sl', setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prepareOpen, setPrepareOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const links = [
    { label: 'Call Assistant', href: '/' },
    { label: lang === 'en' ? 'AI Native' : 'AI native', href: '#ai-native', id: 'ai-native' },
    { label: lang === 'en' ? 'Open Roles' : 'Prosta mesta', href: '#open-roles', id: 'open-roles' },
    { label: lang === 'en' ? 'Food Perks' : 'Hrana', href: '#food', id: 'food' },
    { label: lang === 'en' ? 'AI in Interview' : 'AI na razgovoru', href: '#ai-interview', id: 'ai-interview' },
    { label: lang === 'en' ? 'Team' : 'Ekipa', href: '#team', id: 'team' },
    { label: lang === 'en' ? 'Lifestyle' : 'Lifestyle', href: '#life', id: 'life' },
  ];

  useEffect(() => {
    const sectionIds = ['ai-native', 'open-roles', 'food', 'ai-interview', 'team', 'life'];

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 220;
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prepareLinks = [
    { href: '/question-bank', icon: <BookOpen size={16} />, label: 'Question Bank', desc: 'Browse the questions real candidates were asked, company by company, ranked by how often they come up.' },
    { href: '/mock-interview', icon: <Bot size={16} />, label: 'Mock Interviews', desc: 'Practice out loud against an AI interviewer that answers back, then read the transcript. Your first mock is free.' },
    { href: '/resume-maker', icon: <Contact size={16} />, label: 'Resume Maker', desc: "Build a resume tailored to the role you're chasing, so the call starts from the right story." },
    { href: '/headshots', icon: <Aperture size={16} />, label: 'Headshots', desc: 'Turn one photo into studio-quality headshots for LinkedIn and your resume. Same face, your pick of look.' },
  ];

  return (
    <header
      className={`pk-nav ${scrolled ? 'pk-nav--scrolled' : ''}`}
      role="banner"
    >
      <div className="pk-nav__inner">
        {/* Logo */}
        <a className="pk-nav__logo" href="/" aria-label="ParakeetAI home">
          <img
            src="/images/logo.svg"
            alt="ParakeetAI"
            width="147"
            height="36"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.parakeet-ai.com/landing/shared/logo.svg';
            }}
          />
        </a>

        {/* Desktop Links */}
        <nav className="pk-nav__links" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`pk-nav__link ${activeSection === l.id ? 'pk-nav__link--active' : ''}`}
            >
              {l.label}
            </a>
          ))}
          {/* Prepare dropdown */}
          <div
            className="pk-nav__dropdown-wrap"
            onMouseEnter={() => setPrepareOpen(true)}
            onMouseLeave={() => setPrepareOpen(false)}
          >
            <button
              className={`pk-nav__link pk-nav__link--btn ${prepareOpen ? 'pk-nav__link--active' : ''}`}
              aria-haspopup="menu"
              aria-expanded={prepareOpen}
              onClick={() => setPrepareOpen((v) => !v)}
            >
              Prepare
              <ChevronDown size={14} className={`pk-nav__chevron ${prepareOpen ? 'pk-nav__chevron--open' : ''}`} aria-hidden />
            </button>
            <div className={`pk-nav__dropdown ${prepareOpen ? 'pk-nav__dropdown--open' : ''}`} role="menu">
              {prepareLinks.map((p) => (
                <a key={p.label} href={p.href} role="menuitem" className="pk-nav__dropdown-item">
                  <span className="pk-nav__dropdown-icon">{p.icon}</span>
                  <span className="pk-nav__dropdown-text">
                    <span className="pk-nav__dropdown-label">{p.label}</span>
                    <span className="pk-nav__dropdown-desc">{p.desc}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* CTA buttons */}
        <div className="pk-nav__cta">
          {/* Language Switcher Pill */}
          <button
            type="button"
            className="pk-lang-toggle"
            onClick={() => setLang && setLang((prev) => (prev === 'sl' ? 'en' : 'sl'))}
            aria-label="Switch language"
            title="Switch language (EN / SL)"
          >
            <span className={lang === 'en' ? 'pk-lang-toggle__active' : ''}>EN</span>
            <span className="pk-lang-toggle__sep">/</span>
            <span className={lang === 'sl' ? 'pk-lang-toggle__active' : ''}>SL</span>
          </button>

          <button
            className="pk-nav__hamburger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={`pk-nav__bar ${mobileOpen ? 'pk-nav__bar--top-open' : ''}`} />
            <span className={`pk-nav__bar ${mobileOpen ? 'pk-nav__bar--mid-open' : ''}`} />
            <span className={`pk-nav__bar ${mobileOpen ? 'pk-nav__bar--bot-open' : ''}`} />
          </button>
          <a href="/auth/signin" className="pk-nav__signin">Sign in</a>
          <a href="/auth/signin" className="pk-nav__try">Try for Free</a>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`pk-nav__mobile ${mobileOpen ? 'pk-nav__mobile--open' : ''}`} aria-hidden={!mobileOpen}>
        {links.map((l) => (
          <a key={l.label} href={l.href} className="pk-nav__mobile-link" onClick={() => setMobileOpen(false)}>
            {l.label}
          </a>
        ))}
        <div className="pk-nav__mobile-section">
          <span className="pk-nav__mobile-section-label">Prepare</span>
          {prepareLinks.map((p) => (
            <a key={p.label} href={p.href} className="pk-nav__mobile-link pk-nav__mobile-link--secondary">
              {p.label}
            </a>
          ))}
        </div>
        <a href="/auth/signin" className="pk-nav__mobile-signin">Sign in</a>
      </div>
    </header>
  );
}
