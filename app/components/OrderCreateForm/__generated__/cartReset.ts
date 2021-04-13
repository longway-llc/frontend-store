/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: cartReset
// ====================================================

export interface cartReset_resetCart_cartItems {
  __typename: "ComponentCartCartItem";
  id: string;
}

export interface cartReset_resetCart {
  __typename: "Cart";
  cartItems: (cartReset_resetCart_cartItems | null)[] | null;
}

export interface cartReset {
  resetCart: cartReset_resetCart;
}
