/* src/components/tasks/TaskBoard.jsx */
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { useTasks } from '../../context/TaskContext';
import { Kanban, ArrowRight } from 'lucide-react';

const TaskBoard = ({ filteredTasks, onEditClick }) => {
  const { changeTaskStatus } = useTasks();
  const [dragOverCol, setDragOverCol] = useState(null);

  const columns = [
    { id: 'pending', title: 'Pending', color: 'var(--warning)' },
    { id: 'in_progress', title: 'In Progress', color: 'var(--info)' },
    { id: 'completed', title: 'Completed', color: 'var(--success)' }
  ];

  // Drag & Drop event handlers
  const handleDragOver = (e, colId) => {
    e.preventDefault();
    setDragOverCol(colId);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = async (e, colId) => {
    e.preventDefault();
    setDragOverCol(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      try {
        await changeTaskStatus(taskId, colId);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        alignItems: 'start'
      }}
    >
      {columns.map((col) => {
        const colTasks = filteredTasks.filter((t) => t.status === col.id);
        const isOver = dragOverCol === col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
            className="card"
            style={{
              padding: '16px',
              backgroundColor: isOver ? 'var(--primary-light)' : 'var(--background)',
              borderColor: isOver ? 'var(--primary)' : 'var(--border)',
              borderStyle: isOver ? 'dashed' : 'solid',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              minHeight: '600px',
              transition: 'var(--transition-fast)'
            }}
          >
            {/* Column Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'between',
                padding: '4px 8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: col.color,
                    display: 'inline-block'
                  }}
                />
                <h3 style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {col.title}
                </h3>
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  marginLeft: 'auto'
                }}
              >
                {colTasks.length}
              </span>
            </div>

            {/* Column Tasks Box */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                flex: 1,
                overflowY: 'auto'
              }}
            >
              {colTasks.length > 0 ? (
                colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onEditClick={onEditClick} />
                ))
              ) : (
                /* Elegant Kanban Empty State */
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    gap: '8px',
                    backgroundColor: 'var(--surface)'
                  }}
                >
                  <Kanban size={24} strokeWidth={1.5} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>No tasks here</span>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    Drag tasks here to update their status.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskBoard;
