import { createSelector } from 'reselect';
import { initialState } from '@pages/FinishedOrder/reducer';

const selectFinishedOrderState = (state) => state.finishedOrder || initialState;

export const selectFinishedOrder = createSelector(selectFinishedOrderState, (state) => state.finishedPurchase);
