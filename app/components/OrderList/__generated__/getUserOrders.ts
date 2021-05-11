/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_ORDER_STATUS } from '../../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: getUserOrders
// ====================================================

export interface getUserOrders_me_user_orders_saleProductData_product_group {
  __typename: "Group";
  name: string | null;
}

export interface getUserOrders_me_user_orders_saleProductData_product {
  __typename: "Product";
  id: string;
  pn: string | null;
  uom: string | null;
  color: string | null;
  description_en: string | null;
  description_ru: string | null;
  group: getUserOrders_me_user_orders_saleProductData_product_group | null;
}

export interface getUserOrders_me_user_orders_saleProductData {
  __typename: "ComponentSaleProductDataSaleProductData";
  id: string;
  count: number | null;
  sellingPrice: number | null;
  product: getUserOrders_me_user_orders_saleProductData_product | null;
}

export interface getUserOrders_me_user_orders {
  __typename: "Order";
  id: string;
  invoice: string | null;
  status: ENUM_ORDER_STATUS | null;
  saleProductData: (getUserOrders_me_user_orders_saleProductData | null)[] | null;
}

export interface getUserOrders_me_user {
  __typename: "UsersPermissionsUser";
  orders: (getUserOrders_me_user_orders | null)[] | null;
}

export interface getUserOrders_me {
  __typename: "UsersPermissionsMe";
  user: getUserOrders_me_user | null;
}

export interface getUserOrders {
  me: getUserOrders_me | null;
}
