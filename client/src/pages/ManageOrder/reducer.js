import { produce } from 'immer';
import { SET_ALL_PURCHASE_ADMIN } from './constants';

export const initialState = {
  orderManage: [],
};

const manageOrderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_PURCHASE_ADMIN:
        draft.orderManage = action.payload;
        break;
    }
  });

export default manageOrderReducer;
