import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectActiveOrderState = (state) => state.activeOrder || initialState;

export const selectActiveOrder = createSelector(selectActiveOrderState, (state) => state.activePurchase);
