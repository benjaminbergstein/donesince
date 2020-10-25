/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecordedActivityRecommendations
// ====================================================

export interface RecordedActivityRecommendations_recordedActivityTimeRecommendations {
  __typename: "RecordedActivityTimeRecommendation";
  activityTypeId: number;
  ofDay: number;
  secondsOffset: number;
}

export interface RecordedActivityRecommendations {
  recordedActivityTimeRecommendations: (RecordedActivityRecommendations_recordedActivityTimeRecommendations | null)[];
}
