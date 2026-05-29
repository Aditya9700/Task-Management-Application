/* src/pages/Tasks.jsx */
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskBoard from '../components/tasks/TaskBoard';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import Skeleton from '../components/ui/Skeleton';
import { Plus, ToggleLeft } from 'lucide-react';


const Tasks = () => {
  const { tasks, loading } = useTasks();
  const { globalSearch, setGlobalSearch } = useOutletContext();

  // Filters State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dateCreated');
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'

  // Modal Editing State
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync Topbar global search with local page search
  useEffect(() => {
    setSearch(globalSearch);
  }, [globalSearch]);

  useEffect(() => {
    setGlobalSearch(search);
  }, [search, setGlobalSearch]);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSortBy('dateCreated');
  };

  // 1. Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 2. Sort Tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const priorityWeights = { high: 3, medium: 2, low: 1 };
      return priorityWeights[b.priority] - priorityWeights[a.priority];
    }
    // Default: dateCreated descending (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      {/* Title Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Workspaces Workspace
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Manage, categorize, track status, and coordinate sprint items.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedTask(null);
            setIsEditModalOpen(true);
          }}
          className="btn btn-primary focus-ring"
          style={{ marginLeft: 'auto' }}
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      </div>

      {/* Unified Sorting Filter Box */}
      <TaskFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onReset={handleResetFilters}
      />

      {/* Grid Canvas loader or layouts */}
      {loading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '12px'
          }}
        >
          <Skeleton variant="card" count={1} />
          <Skeleton variant="card" count={1} />
          <Skeleton variant="card" count={1} />
        </div>
      ) : sortedTasks.length > 0 ? (
        viewMode === 'board' ? (
          <TaskBoard filteredTasks={sortedTasks} onEditClick={handleEditClick} />
        ) : (
          <TaskList filteredTasks={sortedTasks} onEditClick={handleEditClick} />
        )
      ) : (
        /* Empty Filter State */
        <div
          className="card animate-fade-in"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 40px',
            textAlign: 'center',
            gap: '16px',
            flex: 1,
            borderStyle: 'dashed',
            backgroundColor: 'var(--surface)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--background)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ToggleLeft size={32} strokeWidth={1.5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              No tasks match active criteria
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', maxWidth: '380px' }}>
              Refine your filters, search keywords, or clear search queries to see all sprint items.
            </p>
          </div>
          <button onClick={handleResetFilters} className="btn btn-secondary btn-sm focus-ring">
            Reset Filters
          </button>
        </div>
      )}

      {/* Editor Modal Sheet */}
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

export default Tasks;
