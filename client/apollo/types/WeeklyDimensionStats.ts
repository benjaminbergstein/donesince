/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WeeklyDimensionStats
// ====================================================

export interface WeeklyDimensionStats_weeklyDimensionStats {
  __typename: "WeeklyDimensionStat";
  weekNumber: number;
  dimensionName: string;
  deltaVsPreviousWeek: number;
  previousWeekValue: number;
  deltaVsBestWeek: number;
  bestWeekValue: number;
  value: number;
}

export interface WeeklyDimensionStats {
  weeklyDimensionStats: WeeklyDimensionStats_weeklyDimensionStats[] | null;
}

export interface WeeklyDimensionStatsVariables {
  weekNumber?: number | null;
}
