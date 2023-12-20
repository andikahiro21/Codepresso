import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectMenuState = (state) => state.menu || initialState;

export const selectCreateMenuError = createSelector(selectMenuState, (state) => state.createError);
