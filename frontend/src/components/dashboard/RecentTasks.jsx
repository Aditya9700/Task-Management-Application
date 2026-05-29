/* src/components/dashboard/RecentTasks.jsx */
import React from 'react';
import { Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import Badge from '../ui/Badge';
import Skeleton from '../ui/Skeleton';

const RecentTasks = ({ tasks, loading, onEditClick, onViewAllClick }) => {
  // Sort by updatedAt descending, pick top 3
  const recent = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

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
          <Clock size={16} color="var(--primary)" />
          <span>Recent Activity</span>
        </h3>
        <button
          onClick={onViewAllClick}
          className="btn-text focus-ring"
          style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
        >
          <span>View workspace</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {recent.length > 0 ? (
          recent.map((task) => (
            <div
              key={task.id}
              onClick={() => onEditClick(task)}
              style={{
                padding: '14px 18px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                gap: '16px',
                width: '100%',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {/* Task Details with safe truncation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
                <span
                  className="text-truncate"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  {task.title}
                </span>
                <span
                  className="text-truncate"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {task.description}
                </span>
              </div>

              {/* Vertical Stack of Badges (Solves horizontal squeezing) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  flexShrink: 0
                }}
              >
                <Badge type="priority" value={task.priority} />
                <Badge type="status" value={task.status} />
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8125rem'
            }}
          >
            No task records registered in this workspace yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
