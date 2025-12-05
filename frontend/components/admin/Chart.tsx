'use client'

import { ChartData } from '@/lib/mockData';

interface ChartProps {
  data: ChartData[];
  type: 'line' | 'bar';
  height?: number;
  color?: string;
}

export default function Chart({ data, type, height = 200, color = '#8b5cf6' }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const padding = 40;
  const width = 600;
  
  if (type === 'line') {
    const points = data.map((d, i) => {
      const x = padding + (i * (width - padding * 2)) / (data.length - 1);
      const y = height - padding - ((d.value / maxValue) * (height - padding * 2));
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: '400px' }}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padding + (i * (height - padding * 2)) / 4;
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Gradient fill */}
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
            fill="url(#lineGradient)"
          />
          
          {/* Points */}
          {data.map((d, i) => {
            const x = padding + (i * (width - padding * 2)) / (data.length - 1);
            const y = height - padding - ((d.value / maxValue) * (height - padding * 2));
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="4" fill={color} />
                <circle cx={x} cy={y} r="6" fill={color} opacity="0.3" className="animate-pulse" />
              </g>
            );
          })}
          
          {/* Labels */}
          {data.map((d, i) => {
            const x = padding + (i * (width - padding * 2)) / (data.length - 1);
            return (
              <text
                key={i}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="12"
              >
                {d.label}
              </text>
            );
          })}
        </svg>
      </div>
    );
  }
  
  // Bar chart
  const barWidth = (width - padding * 2) / data.length - 10;
  
  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ minWidth: '400px' }}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding + (i * (height - padding * 2)) / 4;
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Bars */}
        {data.map((d, i) => {
          const x = padding + (i * (width - padding * 2)) / data.length + 5;
          const barHeight = (d.value / maxValue) * (height - padding * 2);
          const y = height - padding - barHeight;
          
          return (
            <g key={i}>
              <defs>
                <linearGradient id={`barGradient${i}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="1" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={`url(#barGradient${i})`}
                rx="4"
                className="transition-all duration-300 hover:opacity-80"
              />
              <text
                x={x + barWidth / 2}
                y={height - 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="12"
              >
                {d.label}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="14"
                fontWeight="bold"
              >
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
