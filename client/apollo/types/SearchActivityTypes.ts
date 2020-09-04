/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchActivityTypes
// ====================================================

export interface SearchActivityTypes_searchActivityTypes {
  __typename: "ActivityType";
  name: string;
  id: string;
}

export interface SearchActivityTypes {
  searchActivityTypes: SearchActivityTypes_searchActivityTypes[] | null;
}

export interface SearchActivityTypesVariables {
  q: string;
}
