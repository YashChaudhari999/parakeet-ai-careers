import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function ApplyModal({ role, onClose, lang = 'sl' }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', about: '', achievement: '', whyParakeet: '', portfolio: '' });

  if (!role) return null;

  const isEn = lang === 'en';

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  function handleClose() {
    setSent(false);
    setForm({ name: '', email: '', about: '', achievement: '', whyParakeet: '', portfolio: '' });
    onClose();
  }

  return (
    <div
      className="pk-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${role.title}`}
      onMouseDown={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="pk-modal__box">
        <div className="pk-modal__head">
          <div>
            <p className="pk-modal__label">{isEn ? 'Applying for' : 'Prijava na mesto'}</p>
            <h2 className="pk-modal__title">{role.title}</h2>
          </div>
          <button className="pk-modal__close" onClick={handleClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="pk-modal__success">
            <div className="pk-modal__success-icon">✓</div>
            <h3>{isEn ? 'Application submitted!' : 'Prijava uspešno poslana!'}</h3>
            <p>
              {isEn
                ? 'Thank you for your interest! We will review your application and get back to you.'
                : 'Hvala za tvojo prijavo! Pregledali jo bomo in se ti kmalu oglasili.'}
            </p>
            <button className="pk-btn pk-btn--primary" onClick={handleClose}>
              {isEn ? 'Done' : 'Zapri'}
            </button>
          </div>
        ) : (
          <>
            <p className="pk-modal__note">
              {isEn
                ? 'Fill out the form below to submit your application.'
                : 'Izpolni spodnji obrazec in nam pošli svojo prijavo.'}
            </p>
            <form className="pk-modal__form" onSubmit={handleSubmit} id="apply-form">
              <div className="pk-modal__field">
                <label htmlFor="apply-name" className="pk-modal__field-label">
                  {isEn ? 'Full name *' : 'Ime in priimek *'}
                </label>
                <input
                  id="apply-name"
                  required
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="pk-modal__input"
                />
              </div>
              <div className="pk-modal__field">
                <label htmlFor="apply-email" className="pk-modal__field-label">
                  {isEn ? 'Email address *' : 'E-poštni naslov *'}
                </label>
                <input
                  id="apply-email"
                  required
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="pk-modal__input"
                />
              </div>
              <div className="pk-modal__field">
                <label htmlFor="apply-about" className="pk-modal__field-label">
                  {isEn ? 'A bit about yourself *' : 'Nekaj o sebi *'}
                </label>
                <textarea
                  id="apply-about"
                  required
                  placeholder={isEn ? 'Tell us who you are...' : 'Povej nam, kdo si...'}
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  className="pk-modal__textarea"
                />
              </div>
              <div className="pk-modal__field">
                <label htmlFor="apply-achievement" className="pk-modal__field-label">
                  {isEn ? 'Your biggest career achievement *' : 'Tvoj največji karierni dosežek *'}
                </label>
                <textarea
                  id="apply-achievement"
                  required
                  placeholder={isEn ? 'What are you most proud of?' : 'Na kaj si najbolj ponosen?'}
                  value={form.achievement}
                  onChange={(e) => setForm({ ...form, achievement: e.target.value })}
                  className="pk-modal__textarea"
                />
              </div>
              <div className="pk-modal__field">
                <label htmlFor="apply-why" className="pk-modal__field-label">
                  {isEn ? 'Why ParakeetAI?' : 'Zakaj ParakeetAI?'}
                </label>
                <textarea
                  id="apply-why"
                  placeholder={isEn ? 'What draws you to us?' : 'Kaj te pritegne pri nas?'}
                  value={form.whyParakeet}
                  onChange={(e) => setForm({ ...form, whyParakeet: e.target.value })}
                  className="pk-modal__textarea"
                />
              </div>
              <div className="pk-modal__field">
                <label htmlFor="apply-portfolio" className="pk-modal__field-label">
                  {isEn ? 'CV / Portfolio link' : 'Povezava do CV / portfelja'}
                </label>
                <input
                  id="apply-portfolio"
                  type="url"
                  placeholder="https://..."
                  value={form.portfolio}
                  onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                  className="pk-modal__input"
                />
              </div>
              <button type="submit" className="pk-btn pk-btn--primary pk-btn--full">
                {isEn ? 'Submit application' : 'Oddaj prijavo'}
                <ArrowRight size={16} aria-hidden />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
