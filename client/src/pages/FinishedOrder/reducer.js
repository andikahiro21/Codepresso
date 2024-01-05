import { produce } from 'immer';
import { SET_FINISHED_PURCHASE } from './constants';

export const initialState = {
  finishedPurchase: [],
};

const finishedOrderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_FINISHED_PURCHASE:
        draft.finishedPurchase = action.payload;
        break;
    }
  });

export default finishedOrderReducer;
