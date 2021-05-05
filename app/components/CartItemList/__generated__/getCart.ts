/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCart
// ====================================================

export interface getCart_getCart_cartItems_product_photo {
  __typename: "UploadFile";
  url: string;
  formats: any | null;
}

export interface getCart_getCart_cartItems_product_group {
  __typename: "Group";
  name: string | null;
}

export interface getCart_getCart_cartItems_product_consignments {
  __typename: "Consignment";
  id: string;
  name: string | null;
}

export interface getCart_getCart_cartItems_product {
  __typename: "Product";
  id: string;
  pn: string | null;
  uom: string | null;
  description_en: string | null;
  description_ru: string | null;
  color: string | null;
  mfg: string | null;
  price_en: number;
  price_ru: number;
  photo: getCart_getCart_cartItems_product_photo | null;
  group: getCart_getCart_cartItems_product_group | null;
  consignments: (getCart_getCart_cartItems_product_consignments | null)[] | null;
}

export interface getCart_getCart_cartItems {
  __typename: "ComponentCartCartItem";
  id: string;
  count: number | null;
  product: getCart_getCart_cartItems_product | null;
}

export interface getCart_getCart {
  __typename: "Cart";
  id: string;
  cartItems: (getCart_getCart_cartItems | null)[] | null;
}

export interface getCart {
  getCart: getCart_getCart;
}
