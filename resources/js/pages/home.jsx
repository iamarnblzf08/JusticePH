import { useEffect, useState } from 'react';
import Radar from '../Components/Radar';
import StarBorder from '../Components/StarBorder';
import './home.css';

const navigation = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Municipality Desk', href: '/municipality/dashboard' },
];

const PHILIPPINE_MUNICIPALITIES = [
  'Pasig City',
  'Quezon City',
  'Manila City',
  'Makati City',
  'Taguig City',
  'Caloocan City',
  'Mandaluyong City',
  'Marikina City',
  'Parañaque City',
  'Las Piñas City',
  'Valenzuela City',
  'Cebu City',
  'Davao City',
  'Baguio City',
  'Antipolo City',
  'Iloilo City',
];

const emergencyContacts = [
  {
    id: 'emergency-911',
    name: 'National Emergency Hotline',
    role: 'Immediate Police, Fire & Medical Dispatch',
    numberDisplay: '911',
    tel: '911',
  },
  {
    id: 'pao-legal',
    name: "Public Attorney's Office (PAO)",
    role: '24/7 Free Legal Assistance & Counsel',
    numberDisplay: '+63 (2) 8929-9436',
    tel: '+63289299436',
  },
  {
    id: 'pnp-hotline',
    name: 'PNP Patrol 117 / Aleng Pulis',
    role: 'Law Enforcement & Crisis Response',
    numberDisplay: '+63 919-777-7377',
    tel: '+639197777377',
  },
  {
    id: 'doj-action',
    name: 'DOJ Action Center (DOJAC)',
    role: 'Department of Justice Legal Aid & Complaints',
    numberDisplay: '+63 (2) 8521-2930',
    tel: '+63285212930',
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    role: 'citizen', // 'citizen' | 'municipality'
    municipality: 'Pasig City',
    designation: 'Legal Aid Officer',
    password: '',
    confirmPassword: '',
    submitted: false,
    message: '',
  });
  const [modalStep, setModalStep] = useState('location'); // 'location' | 'choices' | 'contacts' | 'report'
  const [locationState, setLocationState] = useState({
    status: 'idle', // 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'
    coords: null,
    message: '',
  });
  const [reportForm, setReportForm] = useState({
    fullName: '',
    contactNumber: '',
    category: 'Legal Assistance / Consultation',
    description: '',
    submitted: false,
  });

  useEffect(() => {
    if (!locationModalOpen && !authModalOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLocationModalOpen(false);
        setAuthModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [locationModalOpen, authModalOpen]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthForm({
      name: '',
      email: '',
      role: 'citizen',
      municipality: 'Pasig City',
      designation: 'Legal Aid Officer',
      password: '',
      confirmPassword: '',
      submitted: false,
      message: '',
    });
    setAuthModalOpen(true);
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    if (authMode === 'signup' && authForm.password !== authForm.confirmPassword) {
      setAuthForm((prev) => ({
        ...prev,
        message: 'Passwords do not match. Please verify and try again.',
      }));
      return;
    }

    setAuthForm((prev) => ({
      ...prev,
      submitted: true,
      message:
        authMode === 'signup'
          ? prev.role === 'municipality'
            ? `Welcome Officer ${prev.name || ''}! Your official LGU account for ${prev.municipality} is ready.`
            : `Welcome to JusticePH, ${prev.name || 'Advocate'}! Your account has been initialized.`
          : 'Successfully signed in. Welcome back to JusticePH.',
    }));
  };

  const openLocationPrompt = () => {
    setModalStep('location');
    setLocationState({ status: 'idle', coords: null, message: '' });
    setReportForm((prev) => ({ ...prev, submitted: false }));
    setLocationModalOpen(true);
  };

  const handleRequestLocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationState({
        status: 'unsupported',
        coords: null,
        message: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    setLocationState({
      status: 'requesting',
      coords: null,
      message: 'Requesting permission from your browser…',
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationState({
          status: 'granted',
          coords: {
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4),
          },
          message: 'Location access granted. Finding help near you.',
        });
      },
      (error) => {
        const deniedMessage =
          error.code === error.PERMISSION_DENIED
            ? 'Location permission was denied. You can still browse resources manually.'
            : 'Unable to retrieve your location right now. Please try again.';
        setLocationState({
          status: 'denied',
          coords: null,
          message: deniedMessage,
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleReportSubmit = (event) => {
    event.preventDefault();
    setReportForm((prev) => ({ ...prev, submitted: true }));
  };

  return (
    <main className="justice-page">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="JusticePH home">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>Justice<span className="brand-accent">PH</span></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className="nav-auth-group">
            <button
              type="button"
              className="nav-btn nav-btn-login"
              onClick={() => {
                setMenuOpen(false);
                openAuthModal('login');
              }}
            >
              Log In
            </button>
            <button
              type="button"
              className="nav-btn nav-btn-signup"
              onClick={() => {
                setMenuOpen(false);
                openAuthModal('signup');
              }}
            >
              Sign Up <span aria-hidden="true">↗</span>
            </button>
          </div>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> A clearer path forward</p>
          <h1 id="hero-title">Scroll Down a little bit <em>if you need help</em></h1>
          <p className="hero-intro">
            JusticePH is being built to help people find a clearer next step.
            <span className="draft-note"> Replace this sentence with what your project actually does.</span>
          </p>
          <p className="hero-caption"><span className="caption-rule" /> Clear information. A more confident next step. <span className="caption-rule" /></p>
        </div>

        <div className="hero-visual" aria-label="Animated radar visualization">
          <div className="visual-label visual-label-top"><span className="status-dot" /> JUSTICEPH / SIGNAL 01</div>
          <div className="radar-frame">
            <Radar
              color="#9bf35b"
              mode="sweep"
              speed={0.7}
              trail={0.38}
              scale={0.88}
              ringCount={5}
              spokeCount={8}
              targets={5}
              clutter={0.22}
              glow={1.15}
              mouseInteraction={true}
              grain={0.018}
              className="hero-radar"
            />
            <div className="radar-crosshair" aria-hidden="true" />
            <div className="radar-center-action">
              <StarBorder
                color="#9bf35b"
                trailColor="#ffffff"
                duration={3.2}
                direction="clockwise"
                stars={2}
                trailLength={0.4}
                thickness={2}
                radius={999}
                glow={0.95}
                hover="lap"
                sparkle={true}
                clickPulse
                theme="dark"
                backgroundColor="rgba(11, 26, 21, 0.92)"
                textColor="#f2f1e9"
                borderColor="rgba(155, 243, 91, 0.55)"
                className="ask-help-btn"
                onClick={openLocationPrompt}
              >
                <span className="ask-help-dot" aria-hidden="true" />
                <span>Ask For Help</span>
                <span className="ask-help-arrow" aria-hidden="true">→</span>
              </StarBorder>
            </div>
          </div>
          <div className="visual-label visual-label-bottom">
            <span>01</span> FIND YOUR BEARING
            <span className="visual-coordinate">14° 35′ N / 121° 00′ E</span>
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">JPH—001</div>
      </section>

      <section className="signal-strip" aria-label="Project principles">
        <p><span>01</span> CLARITY FIRST</p>
        <p><span>02</span> PEOPLE BEFORE PROCESS</p>
        <p><span>03</span> A BETTER NEXT STEP</p>
      </section>

      <section className="info-section" id="how-it-works">
        <div className="section-kicker"><span>01 / THE APPROACH</span><span>MADE TO BE CLEAR</span></div>
        <div className="info-grid">
          <h2>Start with what you need to know.</h2>
          <div className="info-copy">
            <p>
              <strong>[Add a short explanation of JusticePH here.]</strong> Describe who it is for,
              what someone can do on the site, and what they should expect next.
            </p>
            <a className="underlined-link" href="#next-step">Discover the approach <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="steps-row">
          <article className="step-card">
            <span className="step-number">01</span>
            <h3>Tell us what you're looking for</h3>
            <p>[Replace with the first real step or visitor action.]</p>
          </article>
          <article className="step-card">
            <span className="step-number">02</span>
            <h3>See your options clearly</h3>
            <p>[Explain what information or resources JusticePH provides.]</p>
          </article>
          <article className="step-card">
            <span className="step-number">03</span>
            <h3>Choose a next step</h3>
            <p>[Explain the next action without promising a specific result.]</p>
          </article>
        </div>
      </section>

      <section className="closing-section" id="about">
        <div className="closing-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="closing-copy">
          <p className="eyebrow"><span className="status-dot" /> THE NEXT STEP STARTS HERE</p>
          <h2>A little more clarity  
can change <em>where you go next.</em></h2>
          <p id="next-step">[Replace this with your preferred invitation, contact link, or signup action.]</p>
          <a className="button button-primary" href="mailto:hello@justiceph.example">Get in touch <span aria-hidden="true">→</span></a>
          <small>Replace hello@justiceph.example with your real contact address.</small>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>Justice<span className="brand-accent">PH</span></span>
        </a>
        <p>© {new Date().getFullYear()} JusticePH <span>— [Add your organization name]</span></p>
        <a href="#top">Back to top ↑</a>
      </footer>

      {locationModalOpen && (
        <div
          className="location-modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLocationModalOpen(false);
            }
          }}
        >
          <div
            className="location-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-modal-title"
          >
            <div className="location-modal-header">
              <p className="eyebrow location-modal-eyebrow">
                <span className="status-dot" />
                {modalStep === 'location' && ' LOCATION PERMISSION'}
                {modalStep === 'choices' && ' SELECT NEXT STEP'}
                {modalStep === 'contacts' && ' DIRECT ASSISTANCE CONTACTS'}
                {modalStep === 'report' && ' FILE A REPORT / CASE'}
              </p>
              <button
                type="button"
                className="location-modal-close"
                aria-label="Close pop-up"
                onClick={() => setLocationModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {modalStep === 'location' && (
              <>
                <div className="location-modal-icon" aria-hidden="true">
                  <span className="location-pin-ring" />
                  <span className="location-pin-dot" />
                </div>

                <h2 id="location-modal-title">Allow JusticePH to access your location?</h2>
                <p id="location-modal-desc" className="location-modal-copy">
                  We use your current location to connect you with nearby legal aid offices, assistance centers, and local support services as quickly as possible.
                </p>

                {locationState.status !== 'idle' && (
                  <div className={`location-status location-status--${locationState.status}`} role="status">
                    <span>{locationState.message}</span>
                    {locationState.coords && (
                      <strong className="location-coords">
                        {locationState.coords.latitude}° N, {locationState.coords.longitude}° E
                      </strong>
                    )}
                  </div>
                )}

                <div className="location-modal-actions">
                  {locationState.status !== 'granted' ? (
                    <>
                      <button
                        type="button"
                        className="button button-primary location-allow-btn"
                        onClick={handleRequestLocation}
                        disabled={locationState.status === 'requesting'}
                      >
                        {locationState.status === 'requesting' ? 'Requesting access…' : 'Allow Location Access'}
                        <span aria-hidden="true">→</span>
                      </button>
                      {(locationState.status === 'denied' || locationState.status === 'unsupported') && (
                        <button
                          type="button"
                          className="location-dismiss-btn"
                          onClick={() => setModalStep('choices')}
                        >
                          Continue Anyway →
                        </button>
                      )}
                      <button
                        type="button"
                        className="location-dismiss-btn"
                        onClick={() => setLocationModalOpen(false)}
                      >
                        Not Now
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="button button-primary location-allow-btn"
                      onClick={() => setModalStep('choices')}
                    >
                      Continue <span aria-hidden="true">→</span>
                    </button>
                  )}
                </div>
              </>
            )}

            {modalStep === 'choices' && (
              <>
                {locationState.coords && (
                  <div className="detected-location-pill">
                    <span className="status-dot" />
                    <span>Location locked: {locationState.coords.latitude}° N, {locationState.coords.longitude}° E</span>
                  </div>
                )}

                <h2 id="location-modal-title">How would you like us to help?</h2>
                <p className="location-modal-copy">
                  Choose an option below to either call an assistance hotline immediately or submit a formal report/case.
                </p>

                <div className="help-choices-grid">
                  <button
                    type="button"
                    className="help-choice-card"
                    onClick={() => setModalStep('contacts')}
                  >
                    <span className="help-choice-badge">01 / IMMEDIATE CALL</span>
                    <div className="help-choice-title-row">
                      <h3>Ask for Help</h3>
                      <span aria-hidden="true">→</span>
                    </div>
                    <p>View emergency &amp; legal assistance contact numbers and call directly from your phone.</p>
                  </button>

                  <button
                    type="button"
                    className="help-choice-card"
                    onClick={() => setModalStep('report')}
                  >
                    <span className="help-choice-badge">02 / DOCUMENTATION</span>
                    <div className="help-choice-title-row">
                      <h3>File a Report / Case</h3>
                      <span aria-hidden="true">→</span>
                    </div>
                    <p>Submit details of an incident or legal case with your current location attached.</p>
                  </button>
                </div>
              </>
            )}

            {modalStep === 'contacts' && (
              <>
                <h2 id="location-modal-title">Emergency &amp; Legal Contacts</h2>
                <p className="location-modal-copy">
                  Tap <strong>Contact</strong> next to any hotline below to open your phone&apos;s dialer and call immediately.
                </p>

                <div className="contacts-list">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="contact-item">
                      <div className="contact-info">
                        <h3>{contact.name}</h3>
                        <p>{contact.role}</p>
                        <span className="contact-number">{contact.numberDisplay}</span>
                      </div>
                      <a
                        href={`tel:${contact.tel}`}
                        className="button button-primary contact-call-btn"
                        aria-label={`Call ${contact.name} at ${contact.numberDisplay}`}
                      >
                        <span>📞 Contact</span>
                      </a>
                    </div>
                  ))}
                </div>

                <div className="location-modal-actions modal-footer-nav">
                  <button
                    type="button"
                    className="location-dismiss-btn"
                    onClick={() => setModalStep('choices')}
                  >
                    ← Back to options
                  </button>
                </div>
              </>
            )}

            {modalStep === 'report' && (
              <>
                <h2 id="location-modal-title">File a Report / Case</h2>
                <p className="location-modal-copy">
                  Provide the details below so our team or partner legal aid offices can review your case.
                </p>

                {reportForm.submitted ? (
                  <div className="report-success-box" role="status">
                    <div className="location-status location-status--granted">
                      <strong>Report / Case Submitted Successfully</strong>
                      <span>
                        Your report has been logged{locationState.coords ? ` at ${locationState.coords.latitude}° N, ${locationState.coords.longitude}° E` : ''}. Keep your line open for follow-up assistance.
                      </span>
                    </div>
                    <div className="location-modal-actions">
                      <button
                        type="button"
                        className="button button-primary location-allow-btn"
                        onClick={() => setModalStep('contacts')}
                      >
                        View Emergency Contacts <span aria-hidden="true">→</span>
                      </button>
                      <button
                        type="button"
                        className="location-dismiss-btn"
                        onClick={() => setLocationModalOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form className="report-form" onSubmit={handleReportSubmit}>
                    <label className="report-field">
                      <span>Your Name (or leave blank to stay anonymous)</span>
                      <input
                        type="text"
                        placeholder="Juan Dela Cruz"
                        value={reportForm.fullName}
                        onChange={(e) =>
                          setReportForm((prev) => ({ ...prev, fullName: e.target.value }))
                        }
                      />
                    </label>

                    <label className="report-field">
                      <span>Contact Number</span>
                      <input
                        type="tel"
                        required
                        placeholder="+63 9XX XXX XXXX"
                        value={reportForm.contactNumber}
                        onChange={(e) =>
                          setReportForm((prev) => ({ ...prev, contactNumber: e.target.value }))
                        }
                      />
                    </label>

                    <label className="report-field">
                      <span>Case / Incident Category</span>
                      <select
                        value={reportForm.category}
                        onChange={(e) =>
                          setReportForm((prev) => ({ ...prev, category: e.target.value }))
                        }
                      >
                        <option value="Legal Assistance / Consultation">Legal Assistance / Consultation</option>
                        <option value="Crime / Police Assistance">Crime / Police Assistance</option>
                        <option value="Human Rights / Abuse Report">Human Rights / Abuse Report</option>
                        <option value="Labor / Workplace Dispute">Labor / Workplace Dispute</option>
                        <option value="Other Urgent Incident">Other Urgent Incident</option>
                      </select>
                    </label>

                    <label className="report-field">
                      <span>What happened?</span>
                      <textarea
                        rows={3}
                        required
                        placeholder="Briefly describe the situation and how we can help…"
                        value={reportForm.description}
                        onChange={(e) =>
                          setReportForm((prev) => ({ ...prev, description: e.target.value }))
                        }
                      />
                    </label>

                    <div className="location-modal-actions">
                      <button type="submit" className="button button-primary location-allow-btn">
                        Submit Report / Case <span aria-hidden="true">→</span>
                      </button>
                      <button
                        type="button"
                        className="location-dismiss-btn"
                        onClick={() => setModalStep('choices')}
                      >
                        ← Back
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {authModalOpen && (
        <div
          className="location-modal-backdrop"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setAuthModalOpen(false);
            }
          }}
        >
          <div
            className="location-modal auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
            <div className="location-modal-header">
              <div className="auth-tab-switch">
                <button
                  type="button"
                  className={`auth-tab-btn ${authMode === 'login' ? 'is-active' : ''}`}
                  onClick={() => {
                    setAuthMode('login');
                    setAuthForm((prev) => ({ ...prev, message: '', submitted: false }));
                  }}
                >
                  <span className="status-dot" /> Log In
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${authMode === 'signup' ? 'is-active' : ''}`}
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthForm((prev) => ({ ...prev, message: '', submitted: false }));
                  }}
                >
                  <span className="status-dot" /> Sign Up
                </button>
              </div>
              <button
                type="button"
                className="location-modal-close"
                aria-label="Close pop-up"
                onClick={() => setAuthModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <h2 id="auth-modal-title">
              {authMode === 'login' ? 'Welcome Back to JusticePH' : 'Create Your JusticePH Account'}
            </h2>
            <p className="location-modal-copy">
              {authMode === 'login'
                ? 'Sign in to access your cases, tracked reports, and legal assistance network.'
                : 'Join JusticePH to securely document reports, connect with lawyers, and get local aid.'}
            </p>

            {authForm.message && (
              <div
                className={`location-status ${
                  authForm.submitted ? 'location-status--granted' : 'location-status--denied'
                }`}
                role="status"
              >
                <span>{authForm.message}</span>
              </div>
            )}

            {authForm.submitted ? (
              <div className="location-modal-actions">
                {authMode === 'signup' && authForm.role === 'municipality' ? (
                  <a
                    href={`/municipality/dashboard?municipality=${encodeURIComponent(
                      authForm.municipality
                    )}&name=${encodeURIComponent(authForm.name || 'Official')}&role=${encodeURIComponent(
                      authForm.designation
                    )}`}
                    className="button button-primary location-allow-btn"
                    style={{ textDecoration: 'none', textAlign: 'center', width: '100%', display: 'inline-block' }}
                  >
                    Open {authForm.municipality} Dashboard <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className="button button-primary location-allow-btn"
                    onClick={() => setAuthModalOpen(false)}
                  >
                    Continue to JusticePH <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            ) : (
              <form className="report-form" onSubmit={handleAuthSubmit}>
                {authMode === 'signup' && (
                  <>
                    <div className="role-picker">
                      <span className="role-picker-label">Select Account Type</span>
                      <div className="role-options-grid">
                        <button
                          type="button"
                          className={`role-option-card ${authForm.role === 'citizen' ? 'is-selected' : ''}`}
                          onClick={() => setAuthForm((prev) => ({ ...prev, role: 'citizen' }))}
                        >
                          <span className="role-option-title">
                            <span>👥</span> Citizen
                          </span>
                          <span className="role-option-subtitle">
                            Access hotlines, report incidents, request legal aid
                          </span>
                        </button>

                        <button
                          type="button"
                          className={`role-option-card ${authForm.role === 'municipality' ? 'is-selected' : ''}`}
                          onClick={() => setAuthForm((prev) => ({ ...prev, role: 'municipality' }))}
                        >
                          <span className="role-option-title">
                            <span>🏛️</span> Municipality
                          </span>
                          <span className="role-option-subtitle">
                            LGU Command, PAO desk, incident dispatch board
                          </span>
                        </button>
                      </div>
                    </div>

                    <label className="report-field">
                      <span>{authForm.role === 'municipality' ? 'Official / Officer Name' : 'Full Name'}</span>
                      <input
                        type="text"
                        required
                        placeholder={authForm.role === 'municipality' ? 'Atty. Maria Santos' : 'Juan Dela Cruz'}
                        value={authForm.name}
                        onChange={(e) =>
                          setAuthForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </label>

                    {authForm.role === 'municipality' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <label className="report-field">
                          <span>Municipality / City</span>
                          <select
                            value={authForm.municipality}
                            onChange={(e) =>
                              setAuthForm((prev) => ({ ...prev, municipality: e.target.value }))
                            }
                          >
                            {PHILIPPINE_MUNICIPALITIES.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="report-field">
                          <span>Official Designation</span>
                          <select
                            value={authForm.designation}
                            onChange={(e) =>
                              setAuthForm((prev) => ({ ...prev, designation: e.target.value }))
                            }
                          >
                            <option value="City Legal Desk Officer">City Legal Desk</option>
                            <option value="Barangay Justice Desk Officer">Barangay Justice</option>
                            <option value="PAO Intake Officer">PAO Intake Officer</option>
                            <option value="Crisis Response Dispatcher">Crisis Dispatcher</option>
                            <option value="Social Welfare & Dev (CSWD)">CSWD Officer</option>
                          </select>
                        </label>
                      </div>
                    )}
                  </>
                )}

                <label className="report-field">
                  <span>Email Address</span>
                  <input
                    type="email"
                    required
                    placeholder="juan@example.com"
                    value={authForm.email}
                    onChange={(e) =>
                      setAuthForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </label>

                <label className="report-field">
                  <span>Password</span>
                  <input
                    type="password"
                    required
                    minLength={8}
                    placeholder="Enter your password"
                    value={authForm.password}
                    onChange={(e) =>
                      setAuthForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </label>

                {authMode === 'signup' && (
                  <label className="report-field">
                    <span>Confirm Password</span>
                    <input
                      type="password"
                      required
                      minLength={8}
                      placeholder="Re-type your password"
                      value={authForm.confirmPassword}
                      onChange={(e) =>
                        setAuthForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                      }
                    />
                  </label>
                )}

                <div className="location-modal-actions" style={{ marginTop: '10px' }}>
                  <button type="submit" className="button button-primary location-allow-btn">
                    {authMode === 'login' ? 'Sign In' : 'Create Account'} <span aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    className="location-dismiss-btn"
                    onClick={() => {
                      const next = authMode === 'login' ? 'signup' : 'login';
                      setAuthMode(next);
                      setAuthForm((prev) => ({ ...prev, message: '' }));
                    }}
                  >
                    {authMode === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}