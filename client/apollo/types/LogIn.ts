/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_authenticate {
  __typename: "Authorization";
  apiToken: string;
}

export interface LogIn {
  authenticate: LogIn_authenticate;
}

export interface LogInVariables {
  name: string;
}
