/* src/components/tasks/TaskList.jsx */
import React, { useState } from 'react';
import Badge from '../ui/Badge';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useTasks } from '../../context/TaskContext';
import { Calendar, Edit3, Trash2 } from 'lucide-react';

const TaskList = ({ filteredTasks, onEditClick }) => {
  const { deleteTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (task) => {
    if (task.status === 'completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        await deleteTask(selectedTask.id);
        setSelectedTask(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="card" style={{ backgroundColor: 'var(--surface)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.875rem'
          }}
        >
          {/* Table Head */}
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)' }}>Task Details</th>
              <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)' }}>Priority</th>
              <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)' }}>Due Date</th>
              <th style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                style={{
                  borderBottom: '1px solid var(--border)',
                  transition: 'var(--transition-fast)'
                }}
                className="sidebar-user" // Cheat class to inherit hover background! Or inline:
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {/* Title & Description */}
                <td style={{ padding: '16px 24px', maxWidth: '360px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{task.title}</span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {task.description}
                    </span>
                  </div>
                </td>

                {/* Priority Badge */}
                <td style={{ padding: '16px 24px' }}>
                  <Badge type="priority" value={task.priority} />
                </td>

                {/* Status Badge */}
                <td style={{ padding: '16px 24px' }}>
                  <Badge type="status" value={task.status} />
                </td>

                {/* Due Date */}
                <td style={{ padding: '16px 24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: isOverdue(task) ? 'var(--danger)' : 'var(--text-primary)'
                    }}
                  >
                    <Calendar size={14} color={isOverdue(task) ? 'var(--danger)' : 'var(--text-muted)'} />
                    <span>{formatDate(task.dueDate)}</span>
                    {isOverdue(task) && (
                      <span
                        style={{
                          fontSize: '0.625rem',
                          backgroundColor: 'var(--danger-light)',
                          color: 'var(--danger)',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontWeight: 700
                        }}
                      >
                        Overdue
                      </span>
                    )}
                  </div>
                </td>

                {/* Action Buttons */}
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => onEditClick(task)}
                      className="btn btn-secondary btn-sm focus-ring"
                      style={{ padding: '6px' }}
                      title="Edit details"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="btn btn-secondary btn-sm focus-ring"
                      style={{ padding: '6px' }}
                      title="Delete task"
                    >
                      <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Alert */}
      {selectedTask && (
        <ConfirmDialog
          onClose={() => setSelectedTask(null)}
          onConfirm={handleDelete}
          title="Remove task permanently?"
          description={`Are you sure you want to remove "${selectedTask.title}"? This cannot be undone.`}
          confirmText="Delete Task"
        />
      )}
    </div>
  );
};

export default TaskList;
