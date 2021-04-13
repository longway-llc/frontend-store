/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: setProductCountInCart
// ====================================================

export interface setProductCountInCart_changeProductCountInCart_cartItems {
  __typename: "ComponentCartCartItem";
  id: string;
  count: number | null;
}

export interface setProductCountInCart_changeProductCountInCart {
  __typename: "Cart";
  cartItems: (setProductCountInCart_changeProductCountInCart_cartItems | null)[] | null;
  id: string;
}

export interface setProductCountInCart {
  changeProductCountInCart: setProductCountInCart_changeProductCountInCart;
}

export interface setProductCountInCartVariables {
  productId: string;
  count: number;
}
