import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectOrderHistoryState = (state) => state.orderHistory || initialState;

export const selectAllOrder = createSelector(selectOrderHistoryState, (state) => state.allOrder);
