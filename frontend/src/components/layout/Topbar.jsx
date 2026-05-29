/* src/components/layout/Topbar.jsx */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

const Topbar = ({ title, onMenuToggle, onSearchChange, searchValue }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Mock Notifications for a professional dashboard feel
  const mockNotifications = [
    {
      id: 'n-1',
      title: 'Task Assigned',
      desc: 'Alex Rivera assigned "Design Corporate Styleguide" to you.',
      time: '15m ago',
      unread: true
    },
    {
      id: 'n-2',
      title: 'Approaching Deadline',
      desc: 'Refactor Dashboard Stats Widgets is due tomorrow.',
      time: '2h ago',
      unread: true
    },
    {
      id: 'n-3',
      title: 'Workspace Update',
      desc: 'Project compilation bundle size reduced by 15%.',
      time: '1d ago',
      unread: false
    }
  ];

  // Close dropdowns on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
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
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <Menu size={22} />
        </button>
        <h1 className="page-title">{title || 'Workspace'}</h1>
      </div>

      {/* Quick Search */}
      <div className="topbar-search">
        <Search />
        <input
          type="text"
          placeholder="Quick search tasks..."
          value={searchValue || ''}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        {/* Notifications Bell Overlay */}
        <div className="topbar-actions" ref={notifRef} style={{ position: 'relative' }}>
          <button
            className="topbar-btn focus-ring"
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
          >
            <Bell size={20} />
            {mockNotifications.some((n) => n.unread) && <div className="badge-dot" />}
          </button>

          {notifDropdownOpen && (
            <div
              className="card animate-scale-in"
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '320px',
                zIndex: 1000,
                boxShadow: 'var(--shadow-xl)',
                backgroundColor: 'var(--surface)'
              }}
            >
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}
              >
                <span>Recent Activity</span>
                <span
                  style={{
                    color: 'var(--primary)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: 500,
                    marginLeft: 'auto'
                  }}
                >
                  Mark all read
                </span>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {mockNotifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '14px 20px',
                      borderBottom: '1px solid var(--border)',
                      backgroundColor: n.unread ? 'var(--primary-light)' : 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {n.title}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                        {n.time}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {n.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            className="focus-ring"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              borderRadius: 'var(--radius-full)',
              transition: 'var(--transition-fast)'
            }}
          >
            <div
              className="sidebar-avatar"
              style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}
            >
              {user?.avatar ? <img src={user.avatar} alt={user.name} /> : getInitials(user?.name)}
            </div>
            <ChevronDown size={14} color="var(--text-secondary)" />
          </button>

          {profileDropdownOpen && (
            <div
              className="card animate-scale-in"
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                width: '200px',
                zIndex: 1000,
                boxShadow: 'var(--shadow-xl)',
                backgroundColor: 'var(--surface)'
              }}
            >
              <div style={{ padding: '8px' }}>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="sidebar-link"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  <User size={16} />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="sidebar-link"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'var(--border)',
                    margin: '6px 8px'
                  }}
                />
                <button
                  onClick={handleLogout}
                  className="sidebar-link"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: 'var(--danger-hover)'
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
