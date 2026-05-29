/* src/pages/Register.jsx */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const { register, error, setError } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');
    setError(null);

    if (!name || !email || !password) {
      setValidationError('Please fill in all registration fields.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', class: '' };
    let score = 0;
    
    // Length check
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1; // bonus for longer passwords
    
    // Complexity check
    const hasLower = /[a-z]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pass);
    
    const classesCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
    
    if (classesCount >= 2) score += 1;
    if (classesCount >= 3 && pass.length >= 8) score += 1;
    
    // Cap score at 4
    const finalScore = Math.min(score, 4);
    
    if (finalScore === 1) return { score: 1, label: 'Weak', class: 'strength-bar-weak' };
    if (finalScore === 2) return { score: 2, label: 'Fair', class: 'strength-bar-fair' };
    if (finalScore === 3) return { score: 3, label: 'Medium', class: 'strength-bar-medium' };
    if (finalScore === 4) return { score: 4, label: 'Strong', class: 'strength-bar-strong' };
    
    return { score: 0, label: 'Very Weak', class: 'strength-bar-weak' };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="auth-page-container">
      {/* LEFT SIDE: Brand & Showcase */}
      <div className="auth-showcase-panel">
        <div className="auth-brand">
          <div className="auth-brand-logo">
            <Sparkles size={20} />
          </div>
          <span className="auth-brand-name">AeroTask</span>
          <span className="auth-brand-badge">v2.0</span>
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
              Create your account
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Sign up today and experience the AeroTask dashboard.
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
              <label className="form-label" style={{ marginBottom: '6px' }}>Full Name</label>
              <div className="auth-input-wrapper">
                <input
                  type="text"
                  className="auth-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
                <div className="auth-input-icon">
                  <User size={16} />
                </div>
              </div>
            </div>

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
              <label className="form-label" style={{ marginBottom: '6px' }}>Password</label>
              <div className="auth-input-wrapper">
                <input
                  type="password"
                  className="auth-input"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <div className="auth-input-icon">
                  <Lock size={16} />
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="strength-meter-container animate-fade-in">
                  <div className="strength-meter-label">
                    <span>Password Strength</span>
                    <span style={{ 
                      color: strength.score === 1 ? 'var(--danger)' : 
                             strength.score === 2 ? 'var(--warning)' : 
                             strength.score === 3 ? 'hsl(35, 100%, 45%)' : 
                             'var(--success)' 
                    }}>{strength.label}</span>
                  </div>
                  <div className="strength-meter-bars">
                    <div className={`strength-meter-bar ${strength.score >= 1 ? strength.class : ''}`}></div>
                    <div className={`strength-meter-bar ${strength.score >= 2 ? strength.class : ''}`}></div>
                    <div className={`strength-meter-bar ${strength.score >= 3 ? strength.class : ''}`}></div>
                    <div className={`strength-meter-bar ${strength.score >= 4 ? strength.class : ''}`}></div>
                  </div>
                </div>
              )}
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
                  <span>Get Started</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Login Switcher */}
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginTop: '32px',
              fontWeight: 500
            }}
          >
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
