import { produce } from 'immer';
import { SET_ACTIVE_PURCHASE, SET_TOKEN_CHAT } from './constants';

export const initialState = {
  activePurchase: [],
  tokenChat: null,
};

const activeOrderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ACTIVE_PURCHASE:
        draft.activePurchase = action.payload;
        break;
      case SET_TOKEN_CHAT:
        draft.tokenChat = action.payload;
        break;
    }
  });

export default activeOrderReducer;
