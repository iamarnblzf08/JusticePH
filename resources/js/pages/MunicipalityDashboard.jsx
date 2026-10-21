import { useState, useMemo } from 'react';
import './municipality-dashboard.css';

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

const INITIAL_INCIDENTS = [
  {
    id: 'MN-2026-088',
    municipality: 'Pasig City',
    barangay: 'Brgy. Kapasigan',
    category: 'Legal Assistance / Consultation',
    urgency: 'urgent',
    citizenName: 'Eduardo Ramos',
    phone: '+63 917 555 0192',
    timestamp: '14 minutes ago',
    title: 'Wrongful eviction notice served without 30-day barangay conciliation',
    description: 'Tenant received immediate notice to vacate with threats of padlock. Requesting emergency PAO injunction and barangay mediation support before 5:00 PM.',
    status: 'pending',
    coords: '14.5583° N, 121.0833° E',
  },
  {
    id: 'MN-2026-085',
    municipality: 'Pasig City',
    barangay: 'Brgy. San Antonio',
    category: 'Domestic & Family Safety',
    urgency: 'urgent',
    citizenName: 'Anonymous Citizen',
    phone: '+63 920 444 8812',
    timestamp: '42 minutes ago',
    title: 'Urgent VAWC protective order filing request (RA 9262)',
    description: 'Citizen requires immediate legal escort and temporary protection order (BPO) assistance from the local barangay desk and CSWD.',
    status: 'assigned',
    coords: '14.5826° N, 121.0617° E',
  },
  {
    id: 'MN-2026-079',
    municipality: 'Pasig City',
    barangay: 'Brgy. Ugong',
    category: 'Labor & Wage Dispute',
    urgency: 'routine',
    citizenName: 'Marites Alonzo',
    phone: '+63 918 222 7109',
    timestamp: '2 hours ago',
    title: 'Unpaid final pay and withholding of 13th month salary',
    description: 'Security guard terminated without due process hearing. Needs preparation for SEnA (Single Entry Approach) mediation conference.',
    status: 'under_review',
    coords: '14.5889° N, 121.0772° E',
  },
  {
    id: 'MN-2026-074',
    municipality: 'Pasig City',
    barangay: 'Brgy. Rosario',
    category: 'Civil & Human Rights',
    urgency: 'high',
    citizenName: 'Roberto Valerio',
    phone: '+63 927 888 3401',
    timestamp: '4 hours ago',
    title: 'Warrantless detention inquiry and custody rights assistance',
    description: 'Family member detained beyond 36-hour inquest period under Art. 125 RPC without formal charges. Legal counsel required for inquest.',
    status: 'assigned',
    coords: '14.5891° N, 121.0898° E',
  },
  {
    id: 'MN-2026-068',
    municipality: 'Pasig City',
    barangay: 'Brgy. Pinagbuhatan',
    category: 'Barangay Dispute & Mediation',
    urgency: 'routine',
    citizenName: 'Luzviminda Santos',
    phone: '+63 905 111 6398',
    timestamp: 'Yesterday at 3:15 PM',
    title: 'Boundary encroachment and easement conciliation resolved',
    description: 'Amicable settlement reached through Lupon Tagapamayapa. Formal Kasunduan signed by both parties.',
    status: 'resolved',
    coords: '14.5492° N, 121.0964° E',
  },
];

const LOCAL_HOTLINES = [
  { name: 'City Hall Command & Dispatch', number: '(02) 8643-1111', tel: '0286431111' },
  { name: 'PAO District Office Pasig', number: '(02) 8641-0359', tel: '0286410359' },
  { name: 'PNP Pasig Central Police', number: '(02) 8641-0433', tel: '0286410433' },
  { name: 'City Social Welfare & Dev (CSWD)', number: '(02) 8643-0000', tel: '0286430000' },
  { name: 'National Emergency 911', number: '911', tel: '911' },
];

export default function MunicipalityDashboard({
  initialMunicipality = 'Pasig City',
  officialName = 'Atty. Maria Santos',
  officialRole = 'City Legal Desk Officer',
}) {
  const [currentMunicipality, setCurrentMunicipality] = useState(initialMunicipality);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal States
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [activeBroadcast, setActiveBroadcast] = useState(
    'Free Barangay Legal Aid & Notarization Clinic is scheduled this Friday, 9:00 AM at the Pasig City Sports Complex.'
  );

  // New Case Form
  const [newCase, setNewCase] = useState({
    citizenName: '',
    phone: '',
    barangay: 'Brgy. Kapasigan',
    category: 'Legal Assistance / Consultation',
    urgency: 'urgent',
    title: '',
    description: '',
  });

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.barangay.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [incidents, searchQuery, statusFilter, categoryFilter]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: incidents.length,
      urgent: incidents.filter((i) => i.urgency === 'urgent' && i.status !== 'resolved').length,
      underReview: incidents.filter((i) => i.status === 'under_review' || i.status === 'pending').length,
      resolved: incidents.filter((i) => i.status === 'resolved').length,
    };
  }, [incidents]);

  const handleStatusChange = (id, newStatus) => {
    setIncidents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleCreateCase = (e) => {
    e.preventDefault();
    const createdCase = {
      id: `MN-2026-0${Math.floor(100 + Math.random() * 900)}`,
      municipality: currentMunicipality,
      barangay: newCase.barangay,
      category: newCase.category,
      urgency: newCase.urgency,
      citizenName: newCase.citizenName,
      phone: newCase.phone,
      timestamp: 'Just now',
      title: newCase.title,
      description: newCase.description,
      status: 'pending',
      coords: '14.58° N, 121.08° E',
    };

    setIncidents([createdCase, ...incidents]);
    setNewCase({
      citizenName: '',
      phone: '',
      barangay: 'Brgy. Kapasigan',
      category: 'Legal Assistance / Consultation',
      urgency: 'urgent',
      title: '',
      description: '',
    });
    setLogModalOpen(false);
  };

  return (
    <div className="m-dashboard">
      {/* Top Command Bar */}
      <header className="m-topbar">
        <div className="m-topbar-left">
          <a href="/" className="m-brand" title="Back to JusticePH Portal">
            <span className="m-brand-mark">
              <span />
            </span>
            <span>Justice<span style={{ color: 'var(--m-green)' }}>PH</span></span>
          </a>
          <span className="m-brand-badge">LGU COMMAND DESK</span>
        </div>

        <div className="m-topbar-center">
          <div className="m-muni-select-wrapper">
            <span className="m-muni-select-label">JURISDICTION:</span>
            <select
              className="m-muni-select"
              value={currentMunicipality}
              onChange={(e) => setCurrentMunicipality(e.target.value)}
            >
              {PHILIPPINE_MUNICIPALITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="m-topbar-right">
          <a href="/" className="m-btn m-btn-ghost">
            ← Public Portal
          </a>

          <button
            type="button"
            className="m-btn m-btn-primary"
            onClick={() => setLogModalOpen(true)}
          >
            <span>+</span> Log Incident
          </button>

          <div className="m-user-badge">
            <div className="m-user-avatar">
              {officialName ? officialName.charAt(0) : 'O'}
            </div>
            <div className="m-user-text">
              <span className="m-user-name">{officialName}</span>
              <span className="m-user-role">{officialRole}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="m-container">
        {/* Hero Banner */}
        <div className="m-hero-banner">
          <div className="m-banner-copy">
            <span className="m-stat-label">LGU MUNICIPALITY DISPATCH & LEGAL DESK</span>
            <h1>{currentMunicipality} Operation Center</h1>
            <p>
              Real-time citizen legal distress intake, emergency dispatch coordination, and Public Attorney’s Office routing.
            </p>
          </div>

          <div className="m-banner-status">
            <div className="m-live-indicator">
              <span className="m-dot-pulse" />
              <span>LIVE INCIDENT STREAM</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <section className="m-stats-grid" aria-label="Key Performance Indicators">
          <div className="m-stat-card">
            <div className="m-stat-top">
              <span className="m-stat-label">TOTAL INCIDENTS</span>
              <span className="m-stat-icon">📋</span>
            </div>
            <div className="m-stat-val">{stats.total}</div>
            <div className="m-stat-delta">↑ Active municipality queue</div>
          </div>

          <div className="m-stat-card m-stat-card--urgent">
            <div className="m-stat-top">
              <span className="m-stat-label">URGENT CALLS</span>
              <span className="m-stat-icon">🚨</span>
            </div>
            <div className="m-stat-val">{stats.urgent}</div>
            <div className="m-stat-delta">Requires immediate dispatch</div>
          </div>

          <div className="m-stat-card">
            <div className="m-stat-top">
              <span className="m-stat-label">UNDER PAO REVIEW</span>
              <span className="m-stat-icon">⚖️</span>
            </div>
            <div className="m-stat-val">{stats.underReview}</div>
            <div className="m-stat-delta">Inquest & legal aid drafting</div>
          </div>

          <div className="m-stat-card">
            <div className="m-stat-top">
              <span className="m-stat-label">RESOLVED CASES</span>
              <span className="m-stat-icon">✓</span>
            </div>
            <div className="m-stat-val">{stats.resolved}</div>
            <div className="m-stat-delta">Settled through conciliation</div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="m-main-layout">
          {/* Incidents Board */}
          <section className="m-panel" aria-label="Incidents List">
            <div className="m-panel-header">
              <div className="m-panel-title-group">
                <h2>Incoming Distress & Case Feed</h2>
                <p>Showing {filteredIncidents.length} active records for {currentMunicipality}</p>
              </div>
              <button
                type="button"
                className="m-btn m-btn-ghost"
                onClick={() => setBroadcastModalOpen(true)}
              >
                📢 Post Advisory
              </button>
            </div>

            {/* Filter Bar */}
            <div className="m-filter-bar">
              <input
                type="text"
                className="m-search-input"
                placeholder="Search citizen name, case ID, barangay, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                className="m-filter-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Legal Assistance / Consultation">Legal Assistance</option>
                <option value="Domestic & Family Safety">Domestic & VAWC</option>
                <option value="Labor & Wage Dispute">Labor & Wages</option>
                <option value="Civil & Human Rights">Civil & Human Rights</option>
                <option value="Barangay Dispute & Mediation">Barangay Dispute</option>
              </select>

              <select
                className="m-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Dispatch</option>
                <option value="under_review">Under Review</option>
                <option value="assigned">Assigned to PAO</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {/* Cases List */}
            <div className="m-cases-list">
              {filteredIncidents.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--m-muted)' }}>
                  <p style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 600 }}>No incidents matched your query</p>
                  <p style={{ margin: 0, fontSize: '12px' }}>Try resetting filters or searching a different term.</p>
                </div>
              ) : (
                filteredIncidents.map((incident) => (
                  <article key={incident.id} className="m-case-item">
                    <div className="m-case-header">
                      <div className="m-case-id-row">
                        <span className="m-case-id">{incident.id}</span>
                        <span
                          className={`m-badge ${
                            incident.urgency === 'urgent'
                              ? 'm-badge-urgent'
                              : incident.urgency === 'high'
                              ? 'm-badge-crime'
                              : 'm-badge-legal'
                          }`}
                        >
                          {incident.urgency.toUpperCase()}
                        </span>
                        <span
                          className={`m-badge ${
                            incident.status === 'resolved'
                              ? 'm-badge-status-resolved'
                              : incident.status === 'assigned'
                              ? 'm-badge-status-assigned'
                              : 'm-badge-status-pending'
                          }`}
                        >
                          {incident.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <span className="m-case-time">{incident.timestamp}</span>
                    </div>

                    <h3 className="m-case-title">{incident.title}</h3>
                    <p className="m-case-desc">{incident.description}</p>

                    <div className="m-case-footer">
                      <div className="m-case-meta">
                        <span className="m-case-location">
                          📍 {incident.barangay}
                        </span>
                        <span>👤 {incident.citizenName}</span>
                        <span>🏷️ {incident.category}</span>
                      </div>

                      <div className="m-case-actions">
                        <a
                          href={`tel:${incident.phone.replace(/[^0-9+]/g, '')}`}
                          className="m-btn-call"
                          title={`Direct call to ${incident.citizenName}`}
                        >
                          📞 Call Citizen ({incident.phone})
                        </a>

                        {incident.status !== 'resolved' ? (
                          <button
                            type="button"
                            className="m-btn m-btn-ghost"
                            onClick={() => handleStatusChange(incident.id, 'resolved')}
                            title="Mark this case resolved"
                          >
                            ✓ Resolve
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="m-btn m-btn-ghost"
                            onClick={() => handleStatusChange(incident.id, 'under_review')}
                            title="Re-open this case for review"
                          >
                            Re-open
                          </button>
                        )}

                        {incident.status === 'pending' && (
                          <button
                            type="button"
                            className="m-btn m-btn-primary"
                            onClick={() => handleStatusChange(incident.id, 'assigned')}
                          >
                            Assign PAO →
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          {/* Right Sidebar Widgets */}
          <aside className="m-sidebar">
            {/* Community Notice Card */}
            <div className="m-sidebar-card">
              <h3>
                <span>📢</span> Active LGU Advisory
              </h3>
              <div className="m-broadcast-box">
                <p>{activeBroadcast}</p>
                <span className="m-stat-label">BROADCASTED TO ALL {currentMunicipality.toUpperCase()} RESIDENTS</span>
              </div>
            </div>

            {/* Quick Hotline Directory */}
            <div className="m-sidebar-card">
              <h3>
                <span>📞</span> Local Emergency Hotlines
              </h3>
              <div className="m-hotlines-list">
                {LOCAL_HOTLINES.map((hotline) => (
                  <div key={hotline.name} className="m-hotline-row">
                    <div>
                      <div className="m-hotline-name">{hotline.name}</div>
                      <a href={`tel:${hotline.tel}`} className="m-hotline-num">
                        {hotline.number}
                      </a>
                    </div>
                    <a href={`tel:${hotline.tel}`} className="m-btn-call" style={{ padding: '4px 8px', fontSize: '11px' }}>
                      Call
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol Checklist */}
            <div className="m-sidebar-card">
              <h3>
                <span>🛡️</span> Inquest Protocol (Art. 125)
              </h3>
              <div style={{ fontSize: '12px', color: '#c5d5cb', lineHeight: '1.6' }}>
                <p style={{ margin: '0 0 8px' }}>
                  <strong>Time limits for warrantless custody:</strong>
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  <li>Light penalties: 12 Hours</li>
                  <li>Correctional penalties: 18 Hours</li>
                  <li>Afflictive / Capital: 36 Hours</li>
                </ul>
                <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--m-muted)' }}>
                  If past statutory limit without inquest docket, notify PAO for immediate petition.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Log Incident Modal */}
      {logModalOpen && (
        <div className="m-modal-backdrop" role="dialog" aria-modal="true">
          <div className="m-modal-box">
            <div className="m-modal-header">
              <h3>Log Walk-In or Hotline Incident</h3>
              <button
                type="button"
                className="m-btn m-btn-ghost"
                onClick={() => setLogModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCase}>
              <label className="m-form-group">
                <span>Citizen Name</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Clara Santos"
                  value={newCase.citizenName}
                  onChange={(e) => setNewCase({ ...newCase, citizenName: e.target.value })}
                />
              </label>

              <label className="m-form-group">
                <span>Citizen Contact Number</span>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +63 917 123 4567"
                  value={newCase.phone}
                  onChange={(e) => setNewCase({ ...newCase, phone: e.target.value })}
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <label className="m-form-group">
                  <span>Barangay</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brgy. Kapasigan"
                    value={newCase.barangay}
                    onChange={(e) => setNewCase({ ...newCase, barangay: e.target.value })}
                  />
                </label>

                <label className="m-form-group">
                  <span>Urgency Level</span>
                  <select
                    value={newCase.urgency}
                    onChange={(e) => setNewCase({ ...newCase, urgency: e.target.value })}
                  >
                    <option value="urgent">Urgent / Emergency</option>
                    <option value="high">High Priority</option>
                    <option value="routine">Routine</option>
                  </select>
                </label>
              </div>

              <label className="m-form-group">
                <span>Category</span>
                <select
                  value={newCase.category}
                  onChange={(e) => setNewCase({ ...newCase, category: e.target.value })}
                >
                  <option value="Legal Assistance / Consultation">Legal Assistance</option>
                  <option value="Domestic & Family Safety">Domestic & VAWC</option>
                  <option value="Labor & Wage Dispute">Labor & Wages</option>
                  <option value="Civil & Human Rights">Civil & Human Rights</option>
                  <option value="Barangay Dispute & Mediation">Barangay Dispute</option>
                </select>
              </label>

              <label className="m-form-group">
                <span>Incident Summary / Title</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Request for inquest counsel"
                  value={newCase.title}
                  onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                />
              </label>

              <label className="m-form-group">
                <span>Details & Initial Action Taken</span>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe facts, citizen situation, and referral steps taken..."
                  value={newCase.description}
                  onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                />
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  className="m-btn m-btn-ghost"
                  onClick={() => setLogModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="m-btn m-btn-primary">
                  Record & Dispatch →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Advisory Broadcast Modal */}
      {broadcastModalOpen && (
        <div className="m-modal-backdrop" role="dialog" aria-modal="true">
          <div className="m-modal-box">
            <div className="m-modal-header">
              <h3>Update Municipality Advisory</h3>
              <button
                type="button"
                className="m-btn m-btn-ghost"
                onClick={() => setBroadcastModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBroadcastModalOpen(false);
              }}
            >
              <label className="m-form-group">
                <span>Community Bulletin Message</span>
                <textarea
                  rows={4}
                  required
                  value={activeBroadcast}
                  onChange={(e) => setActiveBroadcast(e.target.value)}
                />
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  className="m-btn m-btn-ghost"
                  onClick={() => setBroadcastModalOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="m-btn m-btn-primary">
                  Publish to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
