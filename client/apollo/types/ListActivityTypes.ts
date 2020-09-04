/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListActivityTypes
// ====================================================

export interface ListActivityTypes_listActivityTypes {
  __typename: "ActivityType";
  name: string;
  id: string;
}

export interface ListActivityTypes {
  listActivityTypes: ListActivityTypes_listActivityTypes[];
}

export interface ListActivityTypesVariables {
  id?: string | null;
}
