/* src/components/tasks/TaskFilters.jsx */
import React from 'react';
import { Search, Grid, List, RotateCcw, ArrowUpDown } from 'lucide-react';

const TaskFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onReset
}) => {
  const hasActiveFilters = search || statusFilter !== 'all' || priorityFilter !== 'all' || sortBy !== 'dateCreated';

  return (
    <div
      className="card"
      style={{
        padding: '20px',
        backgroundColor: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '24px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'between'
        }}
      >
        {/* Keyword Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <Search
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
            type="text"
            className="form-control"
            placeholder="Search title, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
        </div>

        {/* Filters Group */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            alignItems: 'center'
          }}
        >
          {/* Status Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Status:</span>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '130px', padding: '8px 12px', fontSize: '0.8125rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Priority Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Priority:</span>
            <select
              className="form-control"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ width: '130px', padding: '8px 12px', fontSize: '0.8125rem' }}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={14} color="var(--text-muted)" />
            <select
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: '140px', padding: '8px 12px', fontSize: '0.8125rem' }}
            >
              <option value="dateCreated">Date Created</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority: High to Low</option>
            </select>
          </div>
        </div>

        {/* View Mode & Reset Controls */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            marginLeft: 'auto'
          }}
        >
          {/* Quick Clear */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="btn btn-secondary btn-sm"
              style={{ padding: '8px 14px', fontSize: '0.8125rem' }}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Clear</span>
            </button>
          )}

          {/* Layout Mode Toggle */}
          <div
            style={{
              display: 'flex',
              backgroundColor: 'var(--background)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}
          >
            <button
              onClick={() => setViewMode('board')}
              className="btn-text"
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'board' ? 'var(--surface)' : 'transparent',
                color: viewMode === 'board' ? 'var(--primary)' : 'var(--text-secondary)',
                boxShadow: viewMode === 'board' ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600
              }}
            >
              <Grid size={16} />
              <span style={{ fontSize: '0.75rem' }}>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="btn-text"
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'list' ? 'var(--surface)' : 'transparent',
                color: viewMode === 'list' ? 'var(--primary)' : 'var(--text-secondary)',
                boxShadow: viewMode === 'list' ? 'var(--shadow-sm)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600
              }}
            >
              <List size={16} />
              <span style={{ fontSize: '0.75rem' }}>List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
