/* src/pages/Dashboard.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import StatsGrid from '../components/dashboard/StatsGrid';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import RecentTasks from '../components/dashboard/RecentTasks';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';
import TaskForm from '../components/tasks/TaskForm';
import { Sparkles, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, loading } = useTasks();
  const navigate = useNavigate();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCreateTaskClick = () => {
    // We can trigger the global sidebar button or directly navigate to tasks to create!
    // But since we want to be professional, let's allow opening the quick task modal locally on the dashboard!
    setSelectedTask(null);
    setIsEditModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Title Greetings banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'between',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Welcome back, {user?.name || 'User'}</span>
            <Sparkles size={20} color="var(--primary)" />
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Here is what's happening in your AeroTask workspace today.
          </p>
        </div>

        <button
          onClick={handleCreateTaskClick}
          className="btn btn-primary focus-ring"
          style={{ marginLeft: 'auto' }}
        >
          <Plus size={16} />
          <span>New Task</span>
        </button>
      </div>

      {/* Stats Cards Row */}
      <StatsGrid tasks={tasks} loading={loading} />

      {/* Main Widgets layout grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}
      >
        {/* Left Side: Recent & Upcoming lists */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', gridColumn: 'span 2' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}
          >
            <RecentTasks
              tasks={tasks}
              loading={loading}
              onEditClick={handleEditClick}
              onViewAllClick={() => navigate('/tasks')}
            />
            <UpcomingDeadlines
              tasks={tasks}
              loading={loading}
              onEditClick={handleEditClick}
            />
          </div>
        </div>

        {/* Right Side: Productivity Chart */}
        <PerformanceChart tasks={tasks} loading={loading} />
      </div>

      {/* Modal editor for Dashboard tasks */}
      {isEditModalOpen && (
        <TaskForm
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedTask(null);
          }}
          taskToEdit={selectedTask}
          modalMode={selectedTask ? 'edit' : 'create'}
        />
      )}
    </div>
  );
};

export default Dashboard;
