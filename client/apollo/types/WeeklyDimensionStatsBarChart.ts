/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WeeklyDimensionStatsBarChart
// ====================================================

export interface WeeklyDimensionStatsBarChart_weeklyDimensionStatsBarChart_datasets {
  __typename: "BarChartDataset";
  label: string;
  data: number[] | null;
}

export interface WeeklyDimensionStatsBarChart_weeklyDimensionStatsBarChart {
  __typename: "BarChartData";
  labels: (string | null)[];
  datasets: (WeeklyDimensionStatsBarChart_weeklyDimensionStatsBarChart_datasets | null)[];
}

export interface WeeklyDimensionStatsBarChart {
  weeklyDimensionStatsBarChart: WeeklyDimensionStatsBarChart_weeklyDimensionStatsBarChart | null;
}

export interface WeeklyDimensionStatsBarChartVariables {
  dimensionName: string;
}
