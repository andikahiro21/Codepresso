import { produce } from 'immer';
import { SET_ACTIVE_PURCHASE } from './constants';

export const initialState = {
  activePurchase: [],
};

const activeOrderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ACTIVE_PURCHASE:
        draft.activePurchase = action.payload;
        break;
    }
  });

export default activeOrderReducer;
