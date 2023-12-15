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
  DELETE_ADDRESS,
  INITIATE_PAYMENT,
  ADD_ADDRESS,
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

export const addAddress = (data) => ({
  type: ADD_ADDRESS,
  payload: data,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

export const deleteAddress = (data) => ({
  type: DELETE_ADDRESS,
  payload: data,
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

export const initiatePayment = (data) => ({
  type: INITIATE_PAYMENT,
  payload: data,
});
