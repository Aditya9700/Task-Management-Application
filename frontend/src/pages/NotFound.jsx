/* src/pages/NotFound.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--background)',
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <div
        className="card animate-slide-up"
        style={{
          padding: '48px 32px',
          maxWidth: '480px',
          boxShadow: 'var(--shadow-xl)',
          backgroundColor: 'var(--surface)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        {/* Logo Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary), hsl(270, 80%, 60%))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <Sparkles size={32} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-1.5px',
              lineHeight: 1
            }}
          >
            404
          </h2>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Workspace Page Not Found
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            The workspace screen or task reference you are looking for does not exist or has been relocated within the directory.
          </p>
        </div>

        <Link to="/" className="btn btn-primary focus-ring" style={{ marginTop: '8px' }}>
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
