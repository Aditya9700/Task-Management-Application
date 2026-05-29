/* src/components/ui/Badge.jsx */
import React from 'react';

const Badge = ({ type, value }) => {
  const getBadgeClass = () => {
    if (type === 'priority') {
      return `badge badge-priority-${value}`;
    }
    return `badge badge-status-${value}`;
  };

  const formatText = (txt) => {
    if (!txt) return '';
    return txt.replace('_', ' ');
  };

  // Add decorative indicators to make badges look highly premium
  const renderIconDot = () => {
    let color = 'currentColor';
    if (type === 'priority') {
      if (value === 'high') color = 'var(--danger)';
      if (value === 'medium') color = 'var(--priority-medium)';
      if (value === 'low') color = 'var(--priority-low)';
    } else {
      if (value === 'completed') color = 'var(--success)';
      if (value === 'in_progress') color = 'var(--info)';
      if (value === 'pending') color = 'var(--warning)';
    }

    return (
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block',
          marginRight: '6px'
        }}
      />
    );
  };

  return (
    <span className={getBadgeClass()}>
      {renderIconDot()}
      <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
        {formatText(value)}
      </span>
    </span>
  );
};

export default Badge;
