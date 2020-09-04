/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetActivityTypeAttribute
// ====================================================

export interface SetActivityTypeAttribute_setActivityTypeAttribute {
  __typename: "ActivityTypeAttribute";
  id: string;
  name: string;
  value: number;
}

export interface SetActivityTypeAttribute {
  setActivityTypeAttribute: SetActivityTypeAttribute_setActivityTypeAttribute;
}

export interface SetActivityTypeAttributeVariables {
  activityTypeId: string;
  name: string;
  value: number;
}
