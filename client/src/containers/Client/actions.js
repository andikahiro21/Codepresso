import { LOGOUT_USER, SET_LOGIN, SET_TOKEN, GET_ADDRESS, SET_ADDRESS } from '@containers/Client/constants';

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
