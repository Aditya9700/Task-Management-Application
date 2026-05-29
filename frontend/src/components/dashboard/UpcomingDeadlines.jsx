/* src/components/dashboard/UpcomingDeadlines.jsx */
import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import Skeleton from '../ui/Skeleton';

const UpcomingDeadlines = ({ tasks, loading, onEditClick }) => {
  // Filter pending/in-progress tasks and sort by due date ascending
  const upcoming = tasks
    .filter((t) => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  const getDeadlineStatus = (dueDateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dueDateStr);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: 'Overdue', color: 'var(--danger)', bg: 'var(--danger-light)' };
    }
    if (diffDays === 0) {
      return { text: 'Due Today', color: 'var(--warning)', bg: 'var(--warning-light)' };
    }
    if (diffDays === 1) {
      return { text: 'Due Tomorrow', color: 'var(--info)', bg: 'var(--info-light)' };
    }
    return { text: `In ${diffDays} days`, color: 'var(--text-secondary)', bg: 'var(--background)' };
  };

  if (loading) {
    return (
      <div className="card" style={{ padding: '24px', flex: 1 }}>
        <Skeleton variant="line" count={1} width="40%" height="20px" style={{ marginBottom: '20px' }} />
        <Skeleton variant="card" count={1} style={{ marginBottom: '12px' }} />
        <Skeleton variant="card" count={1} />
      </div>
    );
  }

  return (
    <div className="card" style={{ backgroundColor: 'var(--surface)', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={16} color="var(--danger)" />
          <span>Approaching Deadlines</span>
        </h3>
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {upcoming.length > 0 ? (
          upcoming.map((task) => {
            const deadline = getDeadlineStatus(task.dueDate);
            return (
              <div
                key={task.id}
                onClick={() => onEditClick(task)}
                style={{
                  padding: '14px 18px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'between',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--danger)';
                  e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '65%' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {task.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: deadline.color,
                    backgroundColor: deadline.bg,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginLeft: 'auto'
                  }}
                >
                  <AlertCircle size={12} />
                  <span>{deadline.text}</span>
                </div>
              </div>
            );
          })
        ) : (
          /* Empty state */
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8125rem'
            }}
          >
            Hurrah! All task deadlines in this workspace are cleared.
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
