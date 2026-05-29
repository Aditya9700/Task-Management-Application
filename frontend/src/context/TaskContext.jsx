/* src/context/TaskContext.jsx */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import { useAuth } from './AuthContext';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks when user session is available
  useEffect(() => {
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id, updatedFields) => {
    setError(null);
    try {
      const updatedTask = await taskService.updateTask(id, updatedFields);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      return updatedTask;
    } catch (err) {
      setError(err.message || 'Failed to update task');
      throw err;
    }
  };

  // Drag and drop helper or rapid status updating
  const changeTaskStatus = async (id, newStatus) => {
    // Optimistic UI updates for ultra-responsive drag-and-drop feedback
    const originalTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));

    try {
      await taskService.updateTask(id, { status: newStatus });
    } catch (err) {
      // Revert in case of backend failure
      setTasks(originalTasks);
      setError(err.message || 'Failed to move task');
    }
  };

  const deleteTask = async (id) => {
    setError(null);
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        loadTasks,
        createTask,
        updateTask,
        changeTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
