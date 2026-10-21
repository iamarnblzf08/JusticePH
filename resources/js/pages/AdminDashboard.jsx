import './admin-dashboard.css';

export default function AdminDashboard({
  adminName = 'JusticePH Administrator',
  adminEmail = 'admin@justiceph.gov',
  adminRole = 'Super Administrator',
}) {
  return (
    <div className="adm-dashboard">
      {/* Admin Top Command Bar */}
      <header className="adm-topbar">
        <div className="adm-topbar-left">
          <a href="/" className="adm-brand">
            <span className="adm-brand-mark">
              <span />
            </span>
            <span>
              Justice<span style={{ color: 'var(--adm-green)' }}>PH</span>
            </span>
          </a>
          <span className="adm-brand-badge">ADMIN CONTROL PANEL</span>
        </div>

        <div className="adm-topbar-right">
          <a href="/" className="adm-btn-ghost">
            ← Public Portal
          </a>
          <a href="/municipality/dashboard" className="adm-btn-ghost">
            Municipality Desk →
          </a>

          <div className="adm-user-badge">
            <div className="adm-user-avatar">
              {adminName ? adminName.charAt(0) : 'A'}
            </div>
            <div className="adm-user-text">
              <span className="adm-user-name">{adminName}</span>
              <span className="adm-user-role">{adminRole}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar Navigation + Content */}
      <div className="adm-layout">
        {/* Navigation Sidebar */}
        <aside className="adm-sidebar">
          <div>
            <div className="adm-nav-section-title">Administration</div>
            <ul className="adm-nav-list">
              <li>
                <div className="adm-nav-item is-active">
                  <span className="adm-nav-icon">📊</span>
                  <span>System Overview</span>
                </div>
              </li>
              <li>
                <div className="adm-nav-item">
                  <span className="adm-nav-icon">👥</span>
                  <span>User Management</span>
                </div>
              </li>
              <li>
                <div className="adm-nav-item">
                  <span className="adm-nav-icon">🏛️</span>
                  <span>Municipalities & LGUs</span>
                </div>
              </li>
              <li>
                <div className="adm-nav-item">
                  <span className="adm-nav-icon">📋</span>
                  <span>Incident Audits</span>
                </div>
              </li>
              <li>
                <div className="adm-nav-item">
                  <span className="adm-nav-icon">⚙️</span>
                  <span>System Settings</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="adm-sidebar-footer">
            <div className="adm-system-pill">
              <span className="adm-dot-pulse" />
              <span>CORE SYSTEM ONLINE</span>
            </div>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="adm-content">
          {/* Hero Banner */}
          <section className="adm-hero-banner">
            <div className="adm-hero-copy">
              <span className="adm-hero-tag">
                <span>🛡️</span> SYSTEM SUPERUSER PORTAL
              </span>
              <h1>Central Administration Console</h1>
              <p>
                Platform oversight, cross-jurisdiction municipal governance, and access role management.
              </p>
            </div>
          </section>

          {/* Metric Stats Cards */}
          <section className="adm-stats-grid" aria-label="Platform Statistics">
            <div className="adm-stat-card">
              <div className="adm-stat-label">
                <span>TOTAL REGISTERED USERS</span>
                <span>👥</span>
              </div>
              <div className="adm-stat-val">3</div>
              <div className="adm-stat-sub">Admin, Municipality & Citizen</div>
            </div>

            <div className="adm-stat-card">
              <div className="adm-stat-label">
                <span>ACTIVE MUNICIPALITIES</span>
                <span>🏛️</span>
              </div>
              <div className="adm-stat-val">16</div>
              <div className="adm-stat-sub">Metro Manila & Regional LGUs</div>
            </div>

            <div className="adm-stat-card">
              <div className="adm-stat-label">
                <span>TOTAL FILED CASES</span>
                <span>📋</span>
              </div>
              <div className="adm-stat-val">5</div>
              <div className="adm-stat-sub">Across all jurisdictions</div>
            </div>

            <div className="adm-stat-card">
              <div className="adm-stat-label">
                <span>PLATFORM INTEGRITY</span>
                <span>🛡️</span>
              </div>
              <div className="adm-stat-val">100%</div>
              <div className="adm-stat-sub">All database services active</div>
            </div>
          </section>

          {/* Content Panels Grid */}
          <div className="adm-sections-grid">
            {/* User Directory Layout Placeholder */}
            <section className="adm-panel">
              <div className="adm-panel-header">
                <h2>User Roles & Accounts Registry</h2>
                <span>PRE-SEEDED SYSTEM ACCOUNTS</span>
              </div>

              <table className="adm-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>MUNICIPALITY</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>JusticePH Administrator</strong></td>
                    <td>admin@justiceph.gov</td>
                    <td>
                      <span className="adm-badge adm-badge-admin">ADMIN</span>
                    </td>
                    <td>National (All)</td>
                    <td><span style={{ color: 'var(--adm-green)' }}>Active</span></td>
                  </tr>
                  <tr>
                    <td><strong>Atty. Maria Santos</strong></td>
                    <td>pasig.desk@justiceph.gov</td>
                    <td>
                      <span className="adm-badge adm-badge-municipality">MUNICIPALITY</span>
                    </td>
                    <td>Pasig City</td>
                    <td><span style={{ color: 'var(--adm-green)' }}>Active</span></td>
                  </tr>
                  <tr>
                    <td><strong>Juan Dela Cruz</strong></td>
                    <td>citizen@justiceph.gov</td>
                    <td>
                      <span className="adm-badge adm-badge-user">USER / CITIZEN</span>
                    </td>
                    <td>Pasig City</td>
                    <td><span style={{ color: 'var(--adm-green)' }}>Active</span></td>
                  </tr>
                </tbody>
              </table>

              <div className="adm-ready-box">
                <h3>Admin Dashboard Layout Ready</h3>
                <p>
                  No functions have been connected yet as requested. Ready for your instructions on what actions and workflows to build next!
                </p>
              </div>
            </section>

            {/* Sidebar Information Widgets */}
            <aside className="adm-side-widgets">
              <div className="adm-widget">
                <h3><span>🖥️</span> Environment Status</h3>
                <div className="adm-info-list">
                  <div className="adm-info-row">
                    <span className="adm-info-key">Database:</span>
                    <span className="adm-info-val">SQLite (Migrated & Seeded)</span>
                  </div>
                  <div className="adm-info-row">
                    <span className="adm-info-key">Auth Guard:</span>
                    <span className="adm-info-val">Multi-Role (Admin, Municipality, User)</span>
                  </div>
                  <div className="adm-info-row">
                    <span className="adm-info-key">Admin Route:</span>
                    <span className="adm-info-val">/admin/dashboard</span>
                  </div>
                  <div className="adm-info-row">
                    <span className="adm-info-key">Framework:</span>
                    <span className="adm-info-val">Laravel + Inertia React</span>
                  </div>
                </div>
              </div>

              <div className="adm-widget">
                <h3><span>📌</span> Upcoming Instructions</h3>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--adm-muted)', lineHeight: '1.6' }}>
                  This dashboard is currently a clean layout scaffold. Tell me what features or functions you want to add next (e.g., user moderation, approving municipality desks, case reassignment, analytics, or custom controls).
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
