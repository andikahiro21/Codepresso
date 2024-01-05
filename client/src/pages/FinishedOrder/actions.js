import { GET_FINISHED_PURCHASE, SET_FINISHED_PURCHASE } from './constants';

export const getFinishedPurchase = () => ({
  type: GET_FINISHED_PURCHASE,
});
export const setFinishedPurchase = (data) => ({
  type: SET_FINISHED_PURCHASE,
  payload: data,
});
