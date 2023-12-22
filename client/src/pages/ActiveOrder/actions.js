import { GET_ACTIVE_PURCHASE, SET_ACTIVE_PURCHASE, SET_FINISH_ORDER } from './constants';

export const getActivePurchase = () => ({
  type: GET_ACTIVE_PURCHASE,
});
export const setActivePurchase = (data) => ({
  type: SET_ACTIVE_PURCHASE,
  payload: data,
});

export const setFinishOrder = (data) => ({
  type: SET_FINISH_ORDER,
  payload: data,
});
