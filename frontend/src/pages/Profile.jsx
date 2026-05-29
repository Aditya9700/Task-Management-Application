/* src/pages/Profile.jsx */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { User, Mail, Award, Edit, Save, Activity, Shield } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { tasks } = useTasks();

  // Form States
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initial populate
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setRole(user.role || 'Software Engineer');
      setBio(user.bio || '');
    }
  }, [user]);

  // Calculations for profile metrics
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    try {
      await updateProfile({ name, role, bio });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // clear success msg
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'AT';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Workspace Member Profile
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Manage your role credentials, professional biography, and track completion statistics.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}
      >
        {/* Left Side: Avatar Card and Statistics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '28px', backgroundColor: 'var(--surface)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div
                className="sidebar-avatar"
                style={{
                  width: '96px',
                  height: '96px',
                  fontSize: '2rem',
                  borderWidth: '3px',
                  borderColor: 'var(--primary-light)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {user?.avatar ? <img src={user.avatar} alt={user.name} /> : getInitials(user?.name)}
              </div>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>{user?.name}</h3>
            <span style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {user?.role}
            </span>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.4 }}>
              {user?.bio || 'No professional bio added yet.'}
            </p>
          </div>

          {/* Quick Metrics Widget */}
          <div className="card" style={{ padding: '24px', backgroundColor: 'var(--surface)' }}>
            <h4
              style={{
                fontSize: '0.8125rem',
                fontWeight: 800,
                color: 'var(--text-secondary)',
                letterSpacing: '0.5px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Activity size={16} color="var(--primary)" />
              <span>PERFORMANCE METRICS</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tasks Handled:</span>
                <span style={{ fontWeight: 700, marginLeft: 'auto' }}>{total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Completed Items:</span>
                <span style={{ fontWeight: 700, color: 'var(--success)', marginLeft: 'auto' }}>{completed}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Completion Ratio:</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)', marginLeft: 'auto' }}>{rate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Edit Form details */}
        <div className="card" style={{ padding: '32px', backgroundColor: 'var(--surface)', gridColumn: 'span 2' }}>
          <h4
            style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.2px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Shield size={18} color="var(--primary)" />
            <span>Profile Configuration Settings</span>
          </h4>

          {success && (
            <div
              className="badge-status-completed"
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                fontWeight: 600,
                fontSize: '0.8125rem'
              }}
            >
              Profile configurations updated and saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Full Account Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Workplace Email (Read-Only)</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  className="form-control"
                  value={user?.email || ''}
                  style={{ paddingLeft: '40px', backgroundColor: 'var(--background)', cursor: 'not-allowed' }}
                  disabled
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Professional Role / Job Title</label>
              <div style={{ position: 'relative' }}>
                <Award size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Biography Description</label>
              <textarea
                className="form-control"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                disabled={loading}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'start', marginTop: '8px' }} disabled={loading}>
              {loading ? (
                <div className="shimmer-bg" style={{ width: '40px', height: '14px', borderRadius: '4px' }} />
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
