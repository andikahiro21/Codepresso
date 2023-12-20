import {
  DELETE_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_SELECTED_PRODUCTS,
  SET_BASKET,
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_SELECTED_PRODUCTS,
} from './constants';

export const getAllProducts = () => ({
  type: GET_ALL_PRODUCTS,
});

export const getSelectedProducts = (id) => ({
  type: GET_SELECTED_PRODUCTS,
  payload: id,
});

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setSelectedProducts = (selectedProducts) => ({
  type: SET_SELECTED_PRODUCTS,
  payload: selectedProducts,
});

export const setBasket = (basket) => ({
  type: SET_BASKET,
  payload: basket,
});

export const deleteProducts = (id) => ({
  type: DELETE_PRODUCTS,
  payload: id,
});
