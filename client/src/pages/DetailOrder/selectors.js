import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectPurchaseState = (state) => state.purchase || initialState;

export const selectHistory = createSelector(selectPurchaseState, (state) => state.historyOrder);
export const selectRoutes = createSelector(selectPurchaseState, (state) => state.mapRoutes);
