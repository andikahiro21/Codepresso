import { produce } from 'immer';
import { SET_CATEGORIES, SET_PRODUCTS, SET_SELECTED_PRODUCTS } from './constants';

export const initialState = {
  products: [],
  categories: [],
  selectedProducts: [],
};

const productReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_PRODUCTS:
        draft.products = action.payload;
        break;
      case SET_CATEGORIES:
        draft.categories = action.payload;
        break;
      case SET_SELECTED_PRODUCTS:
        draft.selectedProducts = action.payload;
        break;
    }
  });

export default productReducer;
