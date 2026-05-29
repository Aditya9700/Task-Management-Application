/* src/components/tasks/TaskCard.jsx */
import React, { useState } from 'react';
import Badge from '../ui/Badge';
import ConfirmDialog from '../ui/ConfirmDialog';
import { useTasks } from '../../context/TaskContext';
import { Calendar, Edit3, Trash, Move } from 'lucide-react';

const TaskCard = ({ task, onEditClick }) => {
  const { deleteTask } = useTasks();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    if (task.status === 'completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="card card-hover animate-slide-up"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          padding: '20px',
          cursor: 'grab',
          position: 'relative',
          backgroundColor: 'var(--surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          borderWidth: '1px'
        }}
      >
        {/* Header (Drag handles & priorities) */}
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
          <Badge type="priority" value={task.priority} />
          
          {/* Action Triggers */}
          <div
            className="task-actions"
            style={{
              display: 'flex',
              gap: '6px',
              marginLeft: 'auto'
            }}
          >
            <button
              onClick={() => onEditClick(task)}
              className="btn-text focus-ring"
              style={{ padding: '4px', borderRadius: '4px', color: 'var(--text-muted)' }}
              title="Edit Task"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => setIsDeleteConfirmOpen(true)}
              className="btn-text focus-ring"
              style={{ padding: '4px', borderRadius: '4px', color: 'var(--text-muted)' }}
              title="Delete Task"
            >
              <Trash size={14} style={{ color: 'var(--danger)' }} />
            </button>
          </div>
        </div>

        {/* Text Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <h4
            style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3
            }}
          >
            {task.title}
          </h4>
          <p
            className="clamp-2"
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.4
            }}
          >
            {task.description}
          </p>
        </div>

        {/* Footer (Due dates & status) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'between',
            borderTop: '1px solid var(--border)',
            paddingTop: '12px',
            marginTop: '4px'
          }}
        >
          {/* Due Date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isOverdue() ? 'var(--danger)' : 'var(--text-muted)'
            }}
          >
            <Calendar size={12} />
            <span>{formatDate(task.dueDate)}</span>
            {isOverdue() && (
              <span
                style={{
                  fontSize: '0.6875rem',
                  backgroundColor: 'var(--danger-light)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  marginLeft: '4px'
                }}
              >
                Overdue
              </span>
            )}
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <Badge type="status" value={task.status} />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Alert Box */}
      {isDeleteConfirmOpen && (
        <ConfirmDialog
          onClose={() => setIsDeleteConfirmOpen(false)}
          onConfirm={handleDelete}
          title="Delete this task?"
          description={`Are you sure you want to remove "${task.title}"? This cannot be undone.`}
          confirmText="Yes, Delete"
        />
      )}
    </>
  );
};

export default TaskCard;
