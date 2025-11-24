import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  icon: LucideIcon;
  description?: string;
}

export const InputSlider: React.FC<InputSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  icon: Icon,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
            <Icon size={20} />
          </div>
          <label className="font-medium text-slate-700 dark:text-slate-200 text-sm uppercase tracking-wide">
            {label}
          </label>
        </div>
        <div className="font-serif text-xl font-bold text-brand-600 dark:text-brand-500">
          {unit === '$' ? '$' : ''}{value.toLocaleString()}{unit !== '$' ? unit : ''}
        </div>
      </div>

      <div className="relative w-full h-6 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>
      
      <div className="flex justify-between mt-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};