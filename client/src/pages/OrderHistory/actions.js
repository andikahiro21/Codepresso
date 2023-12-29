import { GET_ALL_PURCHASE, SET_ALL_PURCHASE } from './constants';

export const getAllOrder = (page) => ({
  type: GET_ALL_PURCHASE,
  payload: page,
});
export const setAllOrder = (data) => ({
  type: SET_ALL_PURCHASE,
  payload: data,
});
