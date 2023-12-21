import {
  GET_ALL_PURCHASE_ADMIN,
  GET_DRIVER_LIST,
  SET_ALL_PURCHASE_ADMIN,
  SET_DRIVER_LIST,
  SET_ORDER_DELIVERY,
} from './constants';

export const getAllOrderAdmin = (page) => ({
  type: GET_ALL_PURCHASE_ADMIN,
  payload: page,
});
export const setAllOrderAdmin = (data) => ({
  type: SET_ALL_PURCHASE_ADMIN,
  payload: data,
});

export const setOrderDelivery = (data) => ({
  type: SET_ORDER_DELIVERY,
  payload: data,
});

export const getDriverList = () => ({
  type: GET_DRIVER_LIST,
});

export const setDriverList = (data) => ({
  type: SET_DRIVER_LIST,
  payload: data,
});
