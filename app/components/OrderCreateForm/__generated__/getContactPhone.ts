/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getContactPhone
// ====================================================

export interface getContactPhone_me_user_customerInfo {
  __typename: "ComponentCustomerCustomer";
  phone: string | null;
}

export interface getContactPhone_me_user {
  __typename: "UsersPermissionsUser";
  customerInfo: getContactPhone_me_user_customerInfo | null;
}

export interface getContactPhone_me {
  __typename: "UsersPermissionsMe";
  user: getContactPhone_me_user | null;
}

export interface getContactPhone {
  me: getContactPhone_me | null;
}
