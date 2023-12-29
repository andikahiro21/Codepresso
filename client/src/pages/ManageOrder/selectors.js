import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectManageOrderState = (state) => state.manageOrder || initialState;

export const selectAllOrderAdmin = createSelector(selectManageOrderState, (state) => state.orderManage);
export const selectDriverList = createSelector(selectManageOrderState, (state) => state.driverList);
