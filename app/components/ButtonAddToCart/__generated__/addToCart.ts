/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addToCart
// ====================================================

export interface addToCart_addToCart_cartItems {
  __typename: "ComponentCartCartItem";
  _id: string;
  count: number | null;
}

export interface addToCart_addToCart {
  __typename: "Cart";
  cartItems: (addToCart_addToCart_cartItems | null)[] | null;
}

export interface addToCart {
  addToCart: addToCart_addToCart;
}

export interface addToCartVariables {
  productId: string;
  count: number;
}
