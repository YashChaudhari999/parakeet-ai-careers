export default function Footer() {
  return (
    <footer className="pk-footer-real">
      <div className="pk-footer-real__bg" aria-hidden />
      
      {/* Left Column */}
      <div className="pk-footer-real__left">
        <a className="pk-footer-real__logo" href="/">
          <img
            alt="ParakeetAI"
            loading="lazy"
            width="159"
            height="40"
            src="/images/logo-white.svg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://www.parakeet-ai.com/landing/shared/logo-white-readable.svg';
            }}
          />
          <span style={{ display: 'none' }} className="pk-footer-real__logo-text">ParakeetAI</span>
        </a>

        <div className="pk-footer-real__sub-info">
          <div className="pk-footer-real__projects">
            <span className="pk-footer-real__label">Our other projects</span>
            <a
              href="https://kismo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="pk-footer-real__project-link"
            >
              Kismo
            </a>
          </div>
          <p className="pk-footer-real__copy">© 2026, ParakeetAI d.o.o. All rights reserved.</p>
        </div>
      </div>

      {/* Right Column Grid */}
      <div className="pk-footer-real__right">
        <div className="pk-footer-real__row">
          <div className="pk-footer-real__col">
            <a href="/#features" className="pk-footer-real__link pk-footer-real__link--white">Features</a>
            <a href="/#privacy" className="pk-footer-real__link pk-footer-real__link--white">Privacy</a>
            <a href="/#pricing" className="pk-footer-real__link pk-footer-real__link--white">Pricing</a>
          </div>
          <div className="pk-footer-real__col">
            <button type="button" className="pk-footer-real__link pk-footer-real__link--muted">Support</button>
          </div>
        </div>

        <div className="pk-footer-real__row">
          <div className="pk-footer-real__col">
            <a href="https://www.megasheet.app/parakeet-ai" target="_blank" rel="noopener noreferrer" className="pk-footer-real__link pk-footer-real__link--white">Creator Program</a>
            <a href="/compare" className="pk-footer-real__link pk-footer-real__link--white">Comparisons</a>
            <a href="https://blog.parakeet-ai.com/" target="_blank" rel="noopener noreferrer" className="pk-footer-real__link pk-footer-real__link--white">Blog</a>
          </div>
          <div className="pk-footer-real__col">
            <a href="/privacy-policy" className="pk-footer-real__link pk-footer-real__link--muted">Privacy Policy</a>
            <a href="/terms-and-conditions" className="pk-footer-real__link pk-footer-real__link--muted">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
