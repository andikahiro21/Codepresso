import { produce } from 'immer';
import { SET_ALL_PURCHASE } from './constants';

export const initialState = {
  allOrder: [],
};

const orderHistoryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_PURCHASE:
        draft.allOrder = action.payload;
        break;
    }
  });

export default orderHistoryReducer;
