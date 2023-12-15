import { produce } from 'immer';

import { SET_HISTORY_ORDER, SET_ROUTES } from './constants';

export const initialState = {
  historyOrder: [],
  mapRoutes: [],
};

export const storedKey = ['mapRoutes'];

const purchaseReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_HISTORY_ORDER:
        draft.historyOrder = action.payload;
        break;
      case SET_ROUTES:
        draft.mapRoutes = action.payload;
        break;
    }
  });

export default purchaseReducer;
