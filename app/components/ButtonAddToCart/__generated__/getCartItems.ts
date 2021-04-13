/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCartItems
// ====================================================

export interface getCartItems_me_user_cart_cartItems_product {
  __typename: "Product";
  id: string;
}

export interface getCartItems_me_user_cart_cartItems {
  __typename: "ComponentCartCartItem";
  id: string;
  count: number | null;
  product: getCartItems_me_user_cart_cartItems_product | null;
}

export interface getCartItems_me_user_cart {
  __typename: "Cart";
  id: string;
  cartItems: (getCartItems_me_user_cart_cartItems | null)[] | null;
}

export interface getCartItems_me_user {
  __typename: "UsersPermissionsUser";
  cart: getCartItems_me_user_cart | null;
}

export interface getCartItems_me {
  __typename: "UsersPermissionsMe";
  user: getCartItems_me_user | null;
}

export interface getCartItems {
  me: getCartItems_me | null;
}
