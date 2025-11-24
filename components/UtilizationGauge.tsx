import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface UtilizationGaugeProps {
  value: number; // 0 to 100
}

export const UtilizationGauge: React.FC<UtilizationGaugeProps> = ({ value }) => {
  // Determine color based on thresholds
  // Green = 85%+, Yellow = 60-84%, Red = <60%
  let color = '#ef4444'; // Red
  if (value >= 85) color = '#10b981'; // Emerald/Green
  else if (value >= 60) color = '#eab308'; // Yellow/Gold

  const data = [
    { name: 'Value', value: Math.min(value, 100) },
    { name: 'Remaining', value: Math.max(0, 100 - value) },
  ];

  return (
    <div className="relative h-64 w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="75%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            cornerRadius={6}
          >
            <Cell key="cell-0" fill={color} />
            <Cell key="cell-1" fill="currentColor" className="text-slate-100 dark:text-slate-800" />
            <Label
                value={`${value.toFixed(1)}%`}
                position="center"
                dy={-20}
                className="fill-slate-900 dark:fill-white text-4xl font-serif font-bold"
                style={{ fontSize: '36px', fontWeight: 'bold' }}
            />
            <Label
                value="Utilization"
                position="center"
                dy={15}
                className="fill-slate-500 dark:fill-slate-400 text-sm uppercase tracking-widest"
                style={{ fontSize: '12px' }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Legend/Status */}
      <div className="absolute bottom-0 w-full flex justify-between px-8 text-xs font-medium text-slate-400">
        <span>0%</span>
        <span>Max Capacity</span>
      </div>
    </div>
  );
};