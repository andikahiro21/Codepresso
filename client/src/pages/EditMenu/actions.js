import { EDIT_MENU, SET_EDIT_ERROR } from './constants';

export const editMenu = (data) => ({
  type: EDIT_MENU,
  payload: data,
});

export const setEditMenu = (data) => ({
  type: SET_EDIT_ERROR,
  payload: data,
});
