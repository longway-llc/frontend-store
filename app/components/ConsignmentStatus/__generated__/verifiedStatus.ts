/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: verifiedStatus
// ====================================================

export interface verifiedStatus_me_user {
  __typename: "UsersPermissionsUser";
  verifiedByAdmin: boolean | null;
}

export interface verifiedStatus_me {
  __typename: "UsersPermissionsMe";
  user: verifiedStatus_me_user | null;
}

export interface verifiedStatus {
  me: verifiedStatus_me | null;
}
