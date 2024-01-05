import { produce } from 'immer';
import { GET_SOFT_DELETED_MENU_SUCCESS, SET_CATEGORIES, SET_PRODUCTS, SET_SELECTED_PRODUCTS } from './constants';

export const initialState = {
  products: [],
  categories: [],
  selectedProducts: [],
  softDelete: [],
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
      case GET_SOFT_DELETED_MENU_SUCCESS:
        draft.softDelete = action.data;
        break;
    }
  });

export default productReducer;
