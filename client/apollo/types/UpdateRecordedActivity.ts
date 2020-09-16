/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRecordedActivity
// ====================================================

export interface UpdateRecordedActivity_updateRecordedActivity {
  __typename: "RecordedActivity";
  recordedAt: string;
}

export interface UpdateRecordedActivity {
  updateRecordedActivity: UpdateRecordedActivity_updateRecordedActivity;
}

export interface UpdateRecordedActivityVariables {
  id: string;
  recordedAt?: string | null;
}
