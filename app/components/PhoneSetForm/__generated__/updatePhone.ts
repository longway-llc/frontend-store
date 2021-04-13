/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updatePhone
// ====================================================

export interface updatePhone_updateUser_user_customerInfo {
  __typename: "ComponentCustomerCustomer";
  phone: string | null;
}

export interface updatePhone_updateUser_user {
  __typename: "UsersPermissionsUser";
  customerInfo: updatePhone_updateUser_user_customerInfo | null;
}

export interface updatePhone_updateUser {
  __typename: "updateUserPayload";
  user: updatePhone_updateUser_user | null;
}

export interface updatePhone {
  updateUser: updatePhone_updateUser | null;
}

export interface updatePhoneVariables {
  phone: string;
  meId: string;
}
