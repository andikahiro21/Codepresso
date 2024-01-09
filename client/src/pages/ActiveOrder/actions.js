import {
  DELETE_CHANNEL,
  GET_ACTIVE_PURCHASE,
  GET_TOKEN_CHAT,
  SET_ACTIVE_PURCHASE,
  SET_FINISH_ORDER,
  SET_TOKEN_CHAT,
} from './constants';

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

export const getTokenChat = () => ({
  type: GET_TOKEN_CHAT,
});

export const setTokenChat = (data) => ({
  type: SET_TOKEN_CHAT,
  payload: data,
});

export const deleteChannel = (data) => ({
  type: DELETE_CHANNEL,
  payload: data,
});
