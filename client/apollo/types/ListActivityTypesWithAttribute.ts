/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListActivityTypesWithAttribute
// ====================================================

export interface ListActivityTypesWithAttribute_listActivityTypes {
  __typename: "ActivityType";
  id: string;
  name: string;
  attributeName: string | null;
  attributeValue: number | null;
}

export interface ListActivityTypesWithAttribute {
  listActivityTypes: ListActivityTypesWithAttribute_listActivityTypes[];
}

export interface ListActivityTypesWithAttributeVariables {
  attributeName: string;
}
