/* src/components/tasks/TaskForm.jsx */
import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { useTasks } from '../../context/TaskContext';
import { Sparkles, Calendar, CheckSquare, Plus, Save } from 'lucide-react';

const TaskForm = ({ onClose, taskToEdit, modalMode = 'create' }) => {
  const { createTask, updateTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');

  // Populate form if in edit mode
  useEffect(() => {
    if (modalMode === 'edit' && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setDueDate(taskToEdit.dueDate);
    } else {
      // Set default due date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [modalMode, taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Task Title is required.');
      return;
    }
    if (!dueDate) {
      setValidationError('Please select a Due Date.');
      return;
    }

    setLoading(true);
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      dueDate
    };

    try {
      if (modalMode === 'edit') {
        await updateTask(taskToEdit.id, taskData);
      } else {
        await createTask(taskData);
      }
      onClose(); // Close modal on success
    } catch (err) {
      setValidationError(err.message || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={onClose}
        disabled={loading}
      >
        Cancel
      </button>
      <button
        type="submit"
        form="task-form-element"
        className="btn btn-primary btn-sm"
        disabled={loading}
      >
        {loading ? (
          <div className="shimmer-bg" style={{ width: '40px', height: '14px', borderRadius: '4px' }} />
        ) : (
          <>
            {modalMode === 'edit' ? <Save size={14} /> : <Plus size={14} />}
            <span>{modalMode === 'edit' ? 'Save Changes' : 'Create Task'}</span>
          </>
        )}
      </button>
    </>
  );

  return (
    <Modal
      onClose={onClose}
      title={modalMode === 'edit' ? 'Edit Task Details' : 'Create New Task'}
      footer={footer}
    >
      <form id="task-form-element" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Error Warning */}
        {validationError && (
          <div
            className="badge-status-pending"
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.75rem',
              color: 'var(--danger)',
              backgroundColor: 'var(--danger-light)',
              fontWeight: 600
            }}
          >
            {validationError}
          </div>
        )}

        {/* Title */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Implement OAuth Flow"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            maxLength={60}
          />
        </div>

        {/* Description */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="Provide a detailed breakdown of the task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            rows={4}
            maxLength={350}
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Filters Group Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Priority */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Priority Level</label>
            <select
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={loading}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Status State</label>
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Due Date</label>
          <div style={{ position: 'relative' }}>
            <Calendar
              size={16}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={loading}
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
