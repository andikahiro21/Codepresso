import { GET_ALL_PURCHASE_ADMIN, SET_ALL_PURCHASE_ADMIN } from './constants';

export const getAllOrderAdmin = (page) => ({
  type: GET_ALL_PURCHASE_ADMIN,
  payload: page,
});
export const setAllOrderAdmin = (data) => ({
  type: SET_ALL_PURCHASE_ADMIN,
  payload: data,
});
