/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListActivityTypeAttributes
// ====================================================

export interface ListActivityTypeAttributes_listActivityTypeAttributes {
  __typename: "ActivityTypeAttribute";
  id: string;
  name: string;
  value: number;
}

export interface ListActivityTypeAttributes {
  listActivityTypeAttributes: ListActivityTypeAttributes_listActivityTypeAttributes[];
}

export interface ListActivityTypeAttributesVariables {
  activityTypeId: string;
}
