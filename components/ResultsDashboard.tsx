import React from 'react';
import { CalculatorResults } from '../types';
import { UtilizationGauge } from './UtilizationGauge';
import { TrendingUp, AlertTriangle, CheckCircle, DollarSign, Activity } from 'lucide-react';

interface ResultsDashboardProps {
  results: CalculatorResults;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Color logic for the message
  const isCritical = results.utilizationRate < 60;
  const isWarning = results.utilizationRate >= 60 && results.utilizationRate < 85;
  const isGood = results.utilizationRate >= 85;

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Main Gap Display */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full ${isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-500'}`}></div>
        
        <h3 className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Monthly Revenue Gap</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white">
             {formatCurrency(results.gap)}
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">/mo</span>
        </div>
        
        {results.gap > 0 ? (
           <div className="flex items-start gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800/30">
             <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={20} />
             <p className="text-rose-700 dark:text-rose-300 font-medium text-lg leading-tight">
               You are leaving <span className="font-bold underline decoration-2 decoration-rose-500/50">{formatCurrency(results.gap)}</span> on the table every single month.
             </p>
           </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
             <CheckCircle className="text-emerald-500 shrink-0" size={20} />
             <p className="text-emerald-700 dark:text-emerald-300 font-medium text-lg">
               Congratulations! You are operating at maximum revenue capacity.
             </p>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        {/* Left: Visualization */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center">
           <h4 className="text-slate-500 dark:text-slate-400 font-medium mb-2">Capacity Utilization</h4>
           <UtilizationGauge value={results.utilizationRate} />
           <div className="mt-4 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Current Weekly Visits: <strong className="text-slate-900 dark:text-slate-200">{results.maxCapacityWeekly > 0 ? Math.round(results.utilizationRate / 100 * results.maxCapacityWeekly) : 0}</strong>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Max Capacity: <strong className="text-slate-900 dark:text-slate-200">{Math.round(results.maxCapacityWeekly)}</strong>
              </p>
           </div>
        </div>

        {/* Right: Details Grid */}
        <div className="grid grid-cols-1 gap-4">
           <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-emerald-600">
                  <DollarSign size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Current Monthly</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{formatCurrency(results.currentMonthlyRevenue)}</p>
                </div>
              </div>
           </div>

           <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-brand-600">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Potential Monthly</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{formatCurrency(results.potentialMonthlyRevenue)}</p>
                </div>
              </div>
           </div>

           <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm text-indigo-500">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Annual Potential</p>
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{formatCurrency(results.potentialMonthlyRevenue * 12)}</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};