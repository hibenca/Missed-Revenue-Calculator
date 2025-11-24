import React, { useState, useEffect, useMemo } from 'react';
import { CalculatorInputs, CalculatorResults } from './types';
import { InputSlider } from './components/InputSlider';
import { ResultsDashboard } from './components/ResultsDashboard';
import { 
  DollarSign, 
  LayoutGrid, 
  Clock, 
  Users, 
  CalendarClock, 
  Moon, 
  Sun, 
  Calculator
} from 'lucide-react';

const App: React.FC = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initial Defaults
  const [inputs, setInputs] = useState<CalculatorInputs>({
    avgRevenuePerVisit: 65,
    numberOfTables: 4,
    openHoursPerWeek: 32,
    avgAdjustmentTimeMinutes: 10,
    currentWeeklyVisits: 400,
  });

  // Handle Input Changes
  const handleInputChange = (key: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Calculation Logic
  const results: CalculatorResults = useMemo(() => {
    // Avoid division by zero
    const adjustmentTime = inputs.avgAdjustmentTimeMinutes > 0 ? inputs.avgAdjustmentTimeMinutes : 1;
    
    const maxCapacityWeekly = (inputs.openHoursPerWeek * 60 / adjustmentTime) * inputs.numberOfTables;
    
    // Cap utilization logic: if current visits > max capacity, they are at 100% (or over-capacity)
    // For the sake of "Gap", we treat over-capacity as 0 gap.
    const rawUtilization = maxCapacityWeekly > 0 ? (inputs.currentWeeklyVisits / maxCapacityWeekly) * 100 : 0;
    const utilizationRate = Math.min(Math.max(rawUtilization, 0), 999); // Allow > 100 for display to show overwork

    const potentialMonthlyRevenue = maxCapacityWeekly * inputs.avgRevenuePerVisit * 4.3;
    const currentMonthlyRevenue = inputs.currentWeeklyVisits * inputs.avgRevenuePerVisit * 4.3;
    
    // Gap cannot be negative for "Potential Gain". If current > potential, gap is 0.
    const gap = Math.max(0, potentialMonthlyRevenue - currentMonthlyRevenue);

    return {
      maxCapacityWeekly,
      utilizationRate,
      potentialMonthlyRevenue,
      currentMonthlyRevenue,
      gap
    };
  }, [inputs]);

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Calculator size={24} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                Missed Revenue <span className="text-brand-600">Calculator</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                For High-Performance Clinics
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Input Section (Left/Top) */}
          <div className="xl:col-span-5 space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Clinic Metrics</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Adjust the sliders below to match your current clinic operations.
              </p>
            </div>

            <InputSlider
              label="Avg Revenue / Visit"
              value={inputs.avgRevenuePerVisit}
              onChange={(val) => handleInputChange('avgRevenuePerVisit', val)}
              min={30}
              max={200}
              unit="$"
              icon={DollarSign}
            />

            <InputSlider
              label="Adjust. Tables/Rooms"
              value={inputs.numberOfTables}
              onChange={(val) => handleInputChange('numberOfTables', val)}
              min={1}
              max={20}
              icon={LayoutGrid}
            />

            <InputSlider
              label="Open Hours / Week"
              value={inputs.openHoursPerWeek}
              onChange={(val) => handleInputChange('openHoursPerWeek', val)}
              min={10}
              max={100}
              unit="h"
              icon={CalendarClock}
            />

            <InputSlider
              label="Avg Adjust. Time"
              value={inputs.avgAdjustmentTimeMinutes}
              onChange={(val) => handleInputChange('avgAdjustmentTimeMinutes', val)}
              min={2}
              max={60}
              unit=" min"
              icon={Clock}
            />

            <InputSlider
              label="Current Weekly Visits"
              value={inputs.currentWeeklyVisits}
              onChange={(val) => handleInputChange('currentWeeklyVisits', val)}
              min={0}
              max={1000}
              icon={Users}
            />
          </div>

          {/* Results Section (Right/Bottom) */}
          <div className="xl:col-span-7">
             <div className="sticky top-24">
                <ResultsDashboard results={results} />
             </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-100 dark:bg-slate-900 py-12 mt-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} The Missed Revenue Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;