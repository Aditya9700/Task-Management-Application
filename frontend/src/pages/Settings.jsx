/* src/pages/Settings.jsx */
import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Sliders, Bell, Layout, CircleUser, Save } from 'lucide-react';

const Settings = () => {
  const SETTINGS_KEY = 'aerotask_settings';
  
  // Settings States
  const [defaultView, setDefaultView] = useState('board');
  const [defaultPriority, setDefaultPriority] = useState('medium');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [compactCards, setCompactCards] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setDefaultView(parsed.defaultView || 'board');
      setDefaultPriority(parsed.defaultPriority || 'medium');
      setEmailAlerts(parsed.emailAlerts !== undefined ? parsed.emailAlerts : true);
      setCompactCards(parsed.compactCards !== undefined ? parsed.compactCards : false);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    const configs = { defaultView, defaultPriority, emailAlerts, compactCards };

    setTimeout(() => {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(configs));
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // clear msg
    }, 600); // Small realistic delay
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Workspace Settings & Preferences
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Configure workspace layouts, customize dashboard components, and toggle alert criteria.
        </p>
      </div>

      <div className="card" style={{ backgroundColor: 'var(--surface)', overflow: 'hidden' }}>
        {/* Form Body */}
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Section 1: UI Configurations */}
          <div style={{ padding: '32px', borderBottom: '1px solid var(--border)' }}>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Layout size={18} color="var(--primary)" />
              <span>Workspace Interface Preferences</span>
            </h4>

            {success && (
              <div
                className="badge-status-completed"
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '24px',
                  fontWeight: 600,
                  fontSize: '0.8125rem'
                }}
              >
                Workspace configuration parameters saved and updated!
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              {/* Default View Mode */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Default Task View Mode</label>
                <select
                  className="form-control"
                  value={defaultView}
                  onChange={(e) => setDefaultView(e.target.value)}
                  disabled={loading}
                >
                  <option value="board">Kanban Board (Default)</option>
                  <option value="list">High Density Table List</option>
                </select>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Sets the default view layout when clicking the Tasks page.
                </span>
              </div>

              {/* Compact Card Toggle */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Default Priority Creation</label>
                <select
                  className="form-control"
                  value={defaultPriority}
                  onChange={(e) => setDefaultPriority(e.target.value)}
                  disabled={loading}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority (Default)</option>
                  <option value="high">High Priority</option>
                </select>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Choose default selection values for newly opened creation forms.
                </span>
              </div>

            </div>
          </div>

          {/* Section 2: Alert Rules */}
          <div style={{ padding: '32px', borderBottom: '1px solid var(--border)' }}>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Bell size={18} color="var(--primary)" />
              <span>Workspace Notifications Controls</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  disabled={loading}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--primary)',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Email Digest Alerts
                </span>
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '28px', marginTop: '-12px' }}>
                Receive immediate email digest notifications when a sprint deadline approaches or tasks are modified.
              </span>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '12px' }}>
                <input
                  type="checkbox"
                  checked={compactCards}
                  onChange={(e) => setCompactCards(e.target.checked)}
                  disabled={loading}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--primary)',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Bell Sounds Alerts
                </span>
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '28px', marginTop: '-12px' }}>
                Toggle immediate UI overlay sounds upon receiving dashboard workspace activity items.
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="card-footer" style={{ padding: '20px 32px', display: 'flex', justifyContent: 'flex-start' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <div className="shimmer-bg" style={{ width: '40px', height: '14px', borderRadius: '4px' }} />
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Preferences</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Settings;
