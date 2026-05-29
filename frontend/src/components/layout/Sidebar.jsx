/* src/components/layout/Sidebar.jsx */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CheckSquare,
  PlusCircle,
  User,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ mobileOpen, setMobileOpen, onCreateTaskClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

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
    <>
      {/* Mobile drawer mask */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* AeroTask SaaS Branding */}
        <div className="sidebar-logo">
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--primary), hsl(270, 80%, 60%))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              color: '#fff'
            }}
          >
            <Sparkles size={16} />
          </div>
          <span>AeroTask</span>
        </div>

        {/* Sidebar Navigations */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
                end={item.path === '/'}
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {/* Quick task trigger card inside sidebar */}
          <button
            onClick={() => {
              setMobileOpen(false);
              onCreateTaskClick();
            }}
            className="sidebar-link"
            style={{
              background: 'transparent',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              marginTop: '12px',
              color: 'var(--primary)',
              cursor: 'pointer'
            }}
          >
            <PlusCircle />
            <span>Create Task</span>
          </button>
        </nav>

        {/* User Card footer link */}
        <div className="sidebar-footer">
          {user && (
            <div className="sidebar-user" onClick={() => {
              navigate('/profile');
              setMobileOpen(false);
            }}>
              <div className="sidebar-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} />
                ) : (
                  getInitials(user.name)
                )}
              </div>
              <div className="sidebar-user-info">
                <span className="sidebar-user-name text-truncate">{user.name}</span>
                <span className="sidebar-user-email text-truncate">{user.email}</span>
              </div>
            </div>
          )}

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="sidebar-link"
            style={{
              background: 'transparent',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              marginTop: '8px',
              cursor: 'pointer',
              color: 'var(--danger-hover)'
            }}
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
