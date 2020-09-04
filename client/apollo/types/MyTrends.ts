/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyTrends
// ====================================================

export interface MyTrends_activityTrends {
  __typename: "ActivityStat";
  name: string;
  averageInterval: string;
  lastRecordedAt: string;
  activityTypeId: string;
  countRecords: number;
}

export interface MyTrends {
  activityTrends: MyTrends_activityTrends[] | null;
}
