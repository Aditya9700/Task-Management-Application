/* src/services/taskService.js */
import api from './api';

// Map frontend casing to backend schema expectations
const toBackendPriority = (priority) => {
  if (!priority) return 'Medium';
  const p = priority.toLowerCase();
  if (p === 'high') return 'High';
  if (p === 'low') return 'Low';
  return 'Medium';
};

const toBackendStatus = (status) => {
  if (!status) return 'Pending';
  const s = status.toLowerCase();
  if (s === 'completed') return 'Completed';
  if (s === 'in_progress' || s === 'in progress') return 'In Progress';
  return 'Pending';
};

// Map backend database values to frontend expectations
const toFrontendPriority = (priority) => {
  if (!priority) return 'medium';
  const p = priority.toLowerCase();
  if (p === 'high') return 'high';
  if (p === 'low') return 'low';
  return 'medium';
};

const toFrontendStatus = (status) => {
  if (!status) return 'pending';
  const s = status.toLowerCase();
  if (s === 'completed') return 'completed';
  if (s === 'in progress' || s === 'in_progress') return 'in_progress';
  return 'pending';
};

// Normalize task objects coming from MongoDB to match frontend layout properties
const normalizeTask = (t) => {
  if (!t) return null;
  return {
    id: t._id,
    title: t.title,
    description: t.description || '',
    priority: toFrontendPriority(t.priority),
    status: toFrontendStatus(t.status),
    dueDate: t.dueDate ? t.dueDate.split('T')[0] : '',
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  };
};

export const taskService = {
  getTasks: async () => {
    const response = await api.get('/tasks');
    const tasks = response.data.data || [];
    return tasks.map(normalizeTask);
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return normalizeTask(response.data.data);
  },

  createTask: async (taskData) => {
    if (!taskData.title) {
      throw new Error('Please fill in all task fields');
    }

    const payload = {
      title: taskData.title.trim(),
      description: (taskData.description || '').trim(),
      priority: toBackendPriority(taskData.priority),
      status: toBackendStatus(taskData.status),
      dueDate: taskData.dueDate || null
    };

    const response = await api.post('/tasks', payload);
    return normalizeTask(response.data.data);
  },

  updateTask: async (id, updatedFields) => {
    const payload = {};
    if (updatedFields.title !== undefined) payload.title = updatedFields.title;
    if (updatedFields.description !== undefined) payload.description = updatedFields.description;
    if (updatedFields.priority !== undefined) payload.priority = toBackendPriority(updatedFields.priority);
    if (updatedFields.status !== undefined) payload.status = toBackendStatus(updatedFields.status);
    if (updatedFields.dueDate !== undefined) payload.dueDate = updatedFields.dueDate || null;

    const response = await api.put(`/tasks/${id}`, payload);
    return normalizeTask(response.data.data);
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    return true;
  }
};
