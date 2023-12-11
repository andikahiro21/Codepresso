import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectProductState = (state) => state.products || initialState;

export const selectProducts = createSelector(selectProductState, (state) => state.products.data);
export const selectCategories = createSelector(selectProductState, (state) => state.categories.data);
