import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectClientState = (state) => state.client || initialState;

export const selectLogin = createSelector(selectClientState, (state) => state.login);
export const selectToken = createSelector(selectClientState, (state) => state.token);
export const selectAddress = createSelector(selectClientState, (state) => state.address.data);
