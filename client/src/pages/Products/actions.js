import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  DELETE_PRODUCTS,
  DELETE_SOFT_MENU,
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_SELECTED_PRODUCTS,
  GET_SOFT_DELETED_MENU,
  GET_SOFT_DELETED_MENU_SUCCESS,
  RESTORE_DELETE_MENU,
  SET_BASKET,
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_PRODUCT_DISABLE,
  SET_PRODUCT_ENABLE,
  SET_SELECTED_PRODUCTS,
} from './constants';

export const getAllProducts = (data, search, categoryId) => ({
  type: GET_ALL_PRODUCTS,
  payload: { data, search, categoryId },
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

export const addCategory = (data) => ({
  type: ADD_CATEGORY,
  payload: data,
});

export const deleteCategory = (data) => ({
  type: DELETE_CATEGORY,
  payload: data,
});

export const setSelectedProducts = (selectedProducts) => ({
  type: SET_SELECTED_PRODUCTS,
  payload: selectedProducts,
});

export const setProductEnable = (data) => ({
  type: SET_PRODUCT_ENABLE,
  payload: data,
});

export const setProductDisable = (data) => ({
  type: SET_PRODUCT_DISABLE,
  payload: data,
});

export const setBasket = (basket) => ({
  type: SET_BASKET,
  payload: basket,
});

export const deleteProducts = (id) => ({
  type: DELETE_PRODUCTS,
  payload: id,
});

export const getSoftDeletedMenu = () => ({
  type: GET_SOFT_DELETED_MENU,
});

export const getSoftDeletedMenuSuccess = (data) => ({
  type: GET_SOFT_DELETED_MENU_SUCCESS,
  data,
});

export const softDeleteMenu = (id, cbSuccess) => ({
  type: DELETE_SOFT_MENU,
  id,
  cbSuccess,
});

export const restoreSoftDeleteMenu = (id, cbSuccess) => ({
  type: RESTORE_DELETE_MENU,
  id,
  cbSuccess,
});
