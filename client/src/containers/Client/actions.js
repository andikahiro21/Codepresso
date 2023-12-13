import {
  LOGOUT_USER,
  SET_LOGIN,
  SET_TOKEN,
  GET_ADDRESS,
  SET_ADDRESS,
  SET_ACTIVE_ADDRESS,
  GET_BASKETS,
  SET_BASKETS,
  EDIT_BASKETS,
  DELETE_BASKETS,
  GET_DISTANCE,
  SET_DISTANCE,
} from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const getAddress = () => ({
  type: GET_ADDRESS,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const setActiveAddress = (id) => ({
  type: SET_ACTIVE_ADDRESS,
  id,
});

export const getBaskets = () => ({
  type: GET_BASKETS,
});

export const setBaskets = (baskets) => ({
  type: SET_BASKETS,
  payload: baskets,
});

export const editBaskets = (data) => ({
  type: EDIT_BASKETS,
  data,
});

export const deleteBaskets = (id) => ({
  type: DELETE_BASKETS,
  payload: id,
});

export const getDistance = () => ({
  type: GET_DISTANCE,
});

export const setDistance = (distance) => ({
  type: SET_DISTANCE,
  payload: distance,
});
