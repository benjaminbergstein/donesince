/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RecordActivity
// ====================================================

export interface RecordActivity_recordActivity {
  __typename: "RecordedActivity";
  recordedAt: string;
  activityTypeId: string;
}

export interface RecordActivity {
  recordActivity: RecordActivity_recordActivity;
}

export interface RecordActivityVariables {
  activityTypeId: string;
  recordedAt: string;
}
