/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchActivityTypeAttributes
// ====================================================

export interface SearchActivityTypeAttributes_searchActivityTypeAttributes {
  __typename: "ActivityTypeAttribute";
  name: string;
  value: number;
}

export interface SearchActivityTypeAttributes {
  searchActivityTypeAttributes: (SearchActivityTypeAttributes_searchActivityTypeAttributes | null)[];
}

export interface SearchActivityTypeAttributesVariables {
  q: string;
}
