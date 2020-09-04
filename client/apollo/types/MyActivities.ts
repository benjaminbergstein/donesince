/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyActivities
// ====================================================

export interface MyActivities_timeline {
  __typename: "TimelineStat";
  activityTypeId: string;
  name: string;
  recordedAt: string;
  recordedById: string;
  sinceLast: string;
  humanReadableDate: string;
  ofDay: number;
}

export interface MyActivities {
  timeline: (MyActivities_timeline | null)[] | null;
}

export interface MyActivitiesVariables {
  offset: number;
}
