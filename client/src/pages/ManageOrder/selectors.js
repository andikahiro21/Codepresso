import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectManageOrderState = (state) => state.manageOrder || initialState;

export const selectAllOrderAdmin = createSelector(selectManageOrderState, (state) => state.orderManage);
