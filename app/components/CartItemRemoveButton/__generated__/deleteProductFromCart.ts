/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteProductFromCart
// ====================================================

export interface deleteProductFromCart_deleteProductFromCart_cartItems {
  __typename: "ComponentCartCartItem";
  id: string;
  count: number | null;
}

export interface deleteProductFromCart_deleteProductFromCart {
  __typename: "Cart";
  cartItems: (deleteProductFromCart_deleteProductFromCart_cartItems | null)[] | null;
}

export interface deleteProductFromCart {
  deleteProductFromCart: deleteProductFromCart_deleteProductFromCart;
}

export interface deleteProductFromCartVariables {
  productId: string;
}
