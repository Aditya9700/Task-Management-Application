/* src/components/ui/Skeleton.jsx */
import React from 'react';

const Skeleton = ({ variant = 'line', count = 1, width, height, style }) => {
  const renderLines = () => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      lines.push(
        <div
          key={i}
          className="skeleton-line shimmer-bg"
          style={{
            width: width || '100%',
            height: height || '14px',
            marginBottom: i === count - 1 ? '0' : '8px',
            ...style
          }}
        />
      );
    }
    return lines;
  };

  if (variant === 'circle') {
    return (
      <div
        className="skeleton-avatar shimmer-bg"
        style={{
          width: width || '40px',
          height: height || '40px',
          ...style
        }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div className="skeleton-card" style={style}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="skeleton-avatar shimmer-bg" />
          <div style={{ flex: 1 }}>
            <div className="skeleton-line shimmer-bg" style={{ width: '60%' }} />
            <div className="skeleton-line shimmer-bg" style={{ width: '40%', height: '10px' }} />
          </div>
        </div>
        <div className="skeleton-line shimmer-bg" style={{ width: '100%', height: '24px', marginTop: '8px' }} />
        <div style={{ display: 'flex', justifyContent: 'between', marginTop: '12px', alignItems: 'center' }}>
          <div className="skeleton-badge shimmer-bg" />
          <div className="skeleton-badge shimmer-bg" style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    );
  }

  if (variant === 'stats') {
    return (
      <div className="skeleton-card" style={{ padding: '24px', ...style }}>
        <div className="skeleton-line shimmer-bg" style={{ width: '40%', height: '12px' }} />
        <div className="skeleton-line shimmer-bg" style={{ width: '70%', height: '28px', marginTop: '12px' }} />
      </div>
    );
  }

  return <>{renderLines()}</>;
};

export default Skeleton;
