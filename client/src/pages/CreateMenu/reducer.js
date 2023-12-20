import { produce } from 'immer';
import { SET_CREATE_ERROR } from './constants';

export const initialState = {
  createError: null,
};

const menuReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_CREATE_ERROR:
        draft.createError = action.payload;
        break;
    }
  });

export default menuReducer;
