/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_USERSPERMISSIONSUSER_LOCALE } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getUserRegion
// ====================================================

export interface getUserRegion_me_user {
  __typename: "UsersPermissionsUser";
  locale: ENUM_USERSPERMISSIONSUSER_LOCALE;
}

export interface getUserRegion_me {
  __typename: "UsersPermissionsMe";
  user: getUserRegion_me_user | null;
}

export interface getUserRegion {
  me: getUserRegion_me | null;
}
