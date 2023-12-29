import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectEditMenuState = (state) => state.editMenu || initialState;

export const selectEditMenuError = createSelector(selectEditMenuState, (state) => state.editError);
