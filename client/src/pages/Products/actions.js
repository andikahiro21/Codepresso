import { GET_ALL_PRODUCTS, GET_CATEGORIES, SET_CATEGORIES, SET_PRODUCTS } from './constants';

export const getAllProducts = () => ({
  type: GET_ALL_PRODUCTS,
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
