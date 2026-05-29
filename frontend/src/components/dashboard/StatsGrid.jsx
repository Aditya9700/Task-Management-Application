/* src/components/dashboard/StatsGrid.jsx */
import React from 'react';
import { CheckSquare, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import Skeleton from '../ui/Skeleton';

const StatsGrid = ({ tasks, loading }) => {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const completed = tasks.filter((t) => t.status === 'completed').length;

  const statItems = [
    {
      label: 'Total Tasks',
      value: total,
      icon: CheckSquare,
      color: 'var(--primary)',
      bg: 'var(--primary-light)',
      trend: 'Workspace active'
    },
    {
      label: 'Pending Tasks',
      value: pending,
      icon: Clock,
      color: 'var(--warning)',
      bg: 'var(--warning-light)',
      trend: `${total > 0 ? Math.round((pending / total) * 100) : 0}% of total`
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: RefreshCw,
      color: 'var(--info)',
      bg: 'var(--info-light)',
      trend: `${total > 0 ? Math.round((inProgress / total) * 100) : 0}% of total`
    },
    {
      label: 'Completed Tasks',
      value: completed,
      icon: CheckCircle2,
      color: 'var(--success)',
      bg: 'var(--success-light)',
      trend: `${total > 0 ? Math.round((completed / total) * 100) : 0}% rate`
    }
  ];

  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}
      >
        <Skeleton variant="stats" count={1} />
        <Skeleton variant="stats" count={1} />
        <Skeleton variant="stats" count={1} />
        <Skeleton variant="stats" count={1} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}
    >
      {statItems.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="card card-hover animate-slide-up"
            style={{
              padding: '24px',
              backgroundColor: 'var(--surface)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Header (Title and Icon wrapper) */}
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)'
                }}
              >
                {stat.label}
              </span>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: stat.bg,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 'auto'
                }}
              >
                <Icon size={18} />
              </div>
            </div>

            {/* Numeric Stat Count */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '-1px'
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontWeight: 500
                }}
              >
                {stat.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
