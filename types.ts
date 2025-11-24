export interface CalculatorInputs {
  avgRevenuePerVisit: number;
  numberOfTables: number;
  openHoursPerWeek: number;
  avgAdjustmentTimeMinutes: number;
  currentWeeklyVisits: number;
}

export interface CalculatorResults {
  maxCapacityWeekly: number;
  utilizationRate: number;
  potentialMonthlyRevenue: number;
  currentMonthlyRevenue: number;
  gap: number;
}