import { produce } from 'immer';
import { SET_ALL_PURCHASE_ADMIN, SET_DRIVER_LIST } from './constants';

export const initialState = {
  orderManage: [],
  driverList: [],
};

const manageOrderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_PURCHASE_ADMIN:
        draft.orderManage = action.payload;
        break;
      case SET_DRIVER_LIST:
        draft.driverList = action.payload;
        break;
    }
  });

export default manageOrderReducer;
