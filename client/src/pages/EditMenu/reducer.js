import { produce } from 'immer';
import { SET_EDIT_ERROR } from './constants';

export const initialState = {
  editError: null,
};

const editMenuReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_EDIT_ERROR:
        draft.editError = action.payload;
        break;
    }
  });

export default editMenuReducer;
