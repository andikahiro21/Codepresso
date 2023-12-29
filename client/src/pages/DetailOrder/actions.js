import { GET_HISTORY_ORDER, GET_ROUTES, SET_HISTORY_ORDER, SET_ROUTES } from './constants';

export const getHistoryOrder = (id) => ({
  type: GET_HISTORY_ORDER,
  payload: id,
});

export const setHistoryOrder = (data) => ({
  type: SET_HISTORY_ORDER,
  payload: data,
});
export const getMapsRoutes = (id) => ({
  type: GET_ROUTES,
  payload: id,
});

export const setMapRoutes = (data) => ({
  type: SET_ROUTES,
  payload: data,
});
