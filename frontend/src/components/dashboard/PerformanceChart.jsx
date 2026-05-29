/* src/components/dashboard/PerformanceChart.jsx */
import React from 'react';
import { Award, Target } from 'lucide-react';
import Skeleton from '../ui/Skeleton';

const PerformanceChart = ({ tasks, loading }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  
  // Calculate completion percentage
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Calculate priority distributions
  const lowP = tasks.filter((t) => t.priority === 'low').length;
  const medP = tasks.filter((t) => t.priority === 'medium').length;
  const highP = tasks.filter((t) => t.priority === 'high').length;

  const lowPct = total > 0 ? Math.round((lowP / total) * 100) : 0;
  const medPct = total > 0 ? Math.round((medP / total) * 100) : 0;
  const highPct = total > 0 ? Math.round((highP / total) * 100) : 0;

  // SVG parameters for the upscaled ring chart
  const radius = 50;
  const stroke = 8;
  const circumference = radius * 2 * Math.PI; // 314.159
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  if (loading) {
    return (
      <div className="card" style={{ padding: '24px', flex: '1', minWidth: '300px' }}>
        <Skeleton variant="line" count={1} width="40%" height="20px" style={{ marginBottom: '20px' }} />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
          <Skeleton variant="circle" width="100px" height="100px" />
        </div>
        <Skeleton variant="line" count={3} />
      </div>
    );
  }

  return (
    <div
      className="card"
      style={{
        backgroundColor: 'var(--surface)',
        flex: '1',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="card-header">
        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={16} color="var(--primary)" />
          <span>Productivity Progress</span>
        </h3>
      </div>

      <div
        className="card-body"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          justifyContent: 'center',
          flex: 1
        }}
      >
        {/* Sleek SVG Donut Progress Chart */}
        <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg height="140" width="140" style={{ transform: 'rotate(-90deg)' }}>
            {/* Premium background ring (Soft Lavender HSL matching brand) */}
            <circle
              stroke="var(--primary-light)"
              fill="transparent"
              strokeWidth={stroke}
              r={radius}
              cx="70"
              cy="70"
            />
            {/* Active progress ring with direct SVG attributes */}
            <circle
              stroke="var(--primary)"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={radius}
              cx="70"
              cy="70"
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1.1
            }}
          >
            <span
              style={{
                fontSize: '1.625rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.5px'
              }}
            >
              {completionRate}%
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 700, letterSpacing: '0.5px' }}>
              COMPLETED
            </span>
          </div>
        </div>


        {/* Dynamic Priority Progress Bars */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary)',
              letterSpacing: '0.5px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '8px'
            }}
          >
            PRIORITY RATIOS
          </span>

          {/* High Priority Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--danger)' }}>High Priority</span>
              <span style={{ color: 'var(--text-primary)', marginLeft: 'auto' }}>{highPct}%</span>
            </div>
            <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--background)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${highPct}%`, backgroundColor: 'var(--danger)', borderRadius: '3px' }} />
            </div>
          </div>

          {/* Medium Priority Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--priority-medium)' }}>Medium Priority</span>
              <span style={{ color: 'var(--text-primary)', marginLeft: 'auto' }}>{medPct}%</span>
            </div>
            <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--background)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${medPct}%`, backgroundColor: 'var(--priority-medium)', borderRadius: '3px' }} />
            </div>
          </div>

          {/* Low Priority Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.75rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Low Priority</span>
              <span style={{ color: 'var(--text-primary)', marginLeft: 'auto' }}>{lowPct}%</span>
            </div>
            <div style={{ height: '6px', width: '100%', backgroundColor: 'var(--background)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${lowPct}%`, backgroundColor: 'var(--text-secondary)', borderRadius: '3px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
