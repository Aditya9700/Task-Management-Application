/* src/pages/Login.jsx */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, Terminal } from 'lucide-react';

const Login = () => {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setError(null);

    if (!email || !password) {
      setValidationError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = () => {
    setEmail('admin@aerotask.com');
    setPassword('password');
    setValidationError('');
  };

  return (
    <div className="auth-page-container">
      {/* LEFT SIDE: Brand & Showcase */}
      <div className="auth-showcase-panel">
        <div className="auth-brand">
          <div className="auth-brand-logo">
            <Sparkles size={20} />
          </div>
          <span className="auth-brand-name">AeroTask</span>
        </div>

        <div className="auth-showcase-content">
          <h1 className="auth-showcase-title">
            The workspace for high-performance teams.
          </h1>
          <p className="auth-showcase-subtitle">
            AeroTask helps engineering, design, and product groups organize project flows, run sprints, and ship premium software—beautifully.
          </p>

          <div className="auth-features-list">
            <div className="auth-feature-item">
              <div className="auth-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>Organize projects effortlessly</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>Track progress in real time</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-check">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span>Collaborate with confidence</span>
            </div>
          </div>

          {/* Interactive CSS dashboard mockup widgets */}
          <div className="auth-mockup-container">
            {/* Main Task List Card */}
            <div className="mockup-card-tasks">
              <div className="mockup-header">
                <span className="mockup-title">Sprint backlog</span>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px' }}>Active Sprint</span>
              </div>
              <div className="mockup-task-row">
                <div className="mockup-task-left">
                  <div className="mockup-task-checkbox checked">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="mockup-task-text completed">Design landing page layout</span>
                </div>
                <div className="mockup-task-right">
                  <span className="badge badge-priority-low">Low</span>
                  <div className="mockup-avatar">AR</div>
                </div>
              </div>
              <div className="mockup-task-row">
                <div className="mockup-task-left">
                  <div className="mockup-task-checkbox"></div>
                  <span className="mockup-task-text">Implement Stripe checkout flows</span>
                </div>
                <div className="mockup-task-right">
                  <span className="badge badge-priority-high">High</span>
                  <div className="mockup-avatar" style={{ backgroundColor: '#fed7aa', color: '#ea580c' }}>JD</div>
                </div>
              </div>
              <div className="mockup-task-row">
                <div className="mockup-task-left">
                  <div className="mockup-task-checkbox"></div>
                  <span className="mockup-task-text">Add automated API coverage</span>
                </div>
                <div className="mockup-task-right">
                  <span className="badge badge-priority-medium">Medium</span>
                  <div className="mockup-avatar" style={{ backgroundColor: '#bae6fd', color: '#0284c7' }}>MC</div>
                </div>
              </div>
            </div>

            {/* Overlapping Activity card */}
            <div className="mockup-card-activity">
              <div className="mockup-activity-flex">
                <div className="mockup-activity-indicator"></div>
                <div className="mockup-activity-text">
                  <span>Aditya Rana updated schema</span>
                  <span className="mockup-activity-time">Just now</span>
                </div>
              </div>
            </div>

            {/* Overlapping Stats card */}
            <div className="mockup-card-stats">
              <div className="mockup-stat-title">Analytics</div>
              <div className="mockup-stat-flex">
                <div>
                  <div className="mockup-stat-val">87%</div>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>Tasks Completed</div>
                </div>
                <div className="mockup-progress-circle">
                  <svg width="40" height="40" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="hsl(210, 32%, 93%)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--primary)" strokeDasharray="87 13" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                  <span className="mockup-progress-inner">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-showcase-footer">
          <span>© {new Date().getFullYear()} AeroTask Inc. All rights reserved.</span>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Card */}
      <div className="auth-card-wrapper">
        <div className="auth-card animate-slide-up">
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.75px',
                margin: '0 0 6px'
              }}
            >
              Welcome back
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Sign in to manage tasks in your active workspaces.
            </p>
          </div>

          {/* Errors overlay */}
          {(error || validationError) && (
            <div
              className="badge-status-pending animate-fade-in"
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.8125rem',
                backgroundColor: 'var(--danger-light)',
                color: 'var(--danger)',
                fontWeight: 600,
                border: '1px solid hsla(var(--danger-h), var(--danger-s), 90%, 0.5)'
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{validationError || error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ marginBottom: '6px' }}>Email Address</label>
              <div className="auth-input-wrapper">
                <input
                  type="email"
                  className="auth-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
                <div className="auth-input-icon">
                  <Mail size={16} />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label">Password</label>
                <a
                  href="#forgot"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--primary)'
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot password?
                </a>
              </div>
              <div className="auth-input-wrapper">
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <div className="auth-input-icon">
                  <Lock size={16} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '6px', padding: '12px 18px' }}
              disabled={loading}
            >
              {loading ? (
                <div className="shimmer-bg" style={{ width: '60px', height: '16px', borderRadius: '4px' }} />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Portfolio Demo Section */}
          <div className="demo-login-widget">
            <div className="demo-pulse-indicator">
              <span className="demo-pulse-dot"></span>
              <span className="demo-pulse-title">Portfolio Demo Active</span>
            </div>
            <p className="demo-widget-desc">
              Test drive the AeroTask workspace instantly with preconfigured credentials.
            </p>
            <button
              type="button"
              onClick={handleQuickLogin}
              className="demo-login-btn"
            >
              <Terminal size={14} />
              <span>Auto-fill Demo Credentials</span>
            </button>
          </div>

          {/* Registration Switcher */}
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginTop: '32px',
              fontWeight: 500
            }}
          >
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
