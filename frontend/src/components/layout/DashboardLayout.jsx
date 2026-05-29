/* src/components/layout/DashboardLayout.jsx */
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { TaskProvider } from '../../context/TaskContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import TaskForm from '../tasks/TaskForm';

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Dynamically resolve page header title based on location
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Dashboard Overview';
      case '/tasks':
        return 'Task Workspace';
      case '/profile':
        return 'Member Profile';
      case '/settings':
        return 'System Settings';
      default:
        return 'AeroTask Workspace';
    }
  };

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Protected route loading check
  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--background)'
        }}
      >
        <div className="skeleton-avatar shimmer-bg" style={{ width: '48px', height: '48px' }} />
      </div>
    );
  }

  // Redirect to login if user session is absent
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <TaskProvider>
      <div className="app-container">
        {/* Responsive Sidebar */}
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onCreateTaskClick={() => setIsCreateModalOpen(true)}
        />

        {/* Core Content Area */}
        <div className="main-area">
          <Topbar
            title={getPageTitle(location.pathname)}
            onMenuToggle={() => setMobileOpen(!mobileOpen)}
            searchValue={globalSearch}
            onSearchChange={setGlobalSearch}
          />

          <main className="content-viewport animate-fade-in">
            {/* Inject global search query via React context or Router state context */}
            <Outlet context={{ globalSearch, setGlobalSearch }} />
          </main>
        </div>

        {/* Global Task Creation Modal Overlay */}
        {isCreateModalOpen && (
          <TaskForm
            onClose={() => setIsCreateModalOpen(false)}
            modalMode="create"
          />
        )}
      </div>
    </TaskProvider>
  );
};

export default DashboardLayout;
