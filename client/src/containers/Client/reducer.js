import { produce } from 'immer';

import { LOGOUT_USER, SET_ADDRESS, SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';

export const initialState = {
  login: false,
  token: null,
  address: [],
};

export const storedKey = ['token', 'login'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case LOGOUT_USER:
        draft.token = null;
        draft.login = false;
        break;
      case SET_ADDRESS:
        draft.address = action.payload;
        break;
    }
  });

export default clientReducer;
