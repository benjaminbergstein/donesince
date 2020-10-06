/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchRecordedActivity
// ====================================================

export interface FetchRecordedActivity_fetchRecordedActivity_activityType {
  __typename: "ActivityType";
  name: string;
}

export interface FetchRecordedActivity_fetchRecordedActivity {
  __typename: "RecordedActivity";
  activityTypeId: string;
  recordedAt: string;
  activityType: FetchRecordedActivity_fetchRecordedActivity_activityType;
}

export interface FetchRecordedActivity {
  fetchRecordedActivity: FetchRecordedActivity_fetchRecordedActivity;
}

export interface FetchRecordedActivityVariables {
  id: string;
}
