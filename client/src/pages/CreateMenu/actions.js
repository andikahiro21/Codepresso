import { CREATE_MENU, SET_CREATE_ERROR } from './constants';

export const createMenu = (data) => ({
  type: CREATE_MENU,
  payload: data,
});

export const setCreateError = (data) => ({
  type: SET_CREATE_ERROR,
  payload: data,
});
