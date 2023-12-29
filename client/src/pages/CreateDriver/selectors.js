import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegisterDriverState = (state) => state.registerDriver || initialState;

export const selectRegisterError = createSelector(selectRegisterDriverState, (state) => state.registerDriverError);
