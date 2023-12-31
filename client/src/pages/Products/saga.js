import { call, put, takeLatest } from 'redux-saga/effects';
import {
  addCategory,
  deleteCategory,
  deleteProducts,
  disableProduct,
  enableProduct,
  getAllProducts,
  getCategories,
  getSelectedProducts,
  setBasket,
} from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';
import toast from 'react-hot-toast';
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  DELETE_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_SELECTED_PRODUCTS,
  SET_BASKET,
  SET_PRODUCT_DISABLE,
  SET_PRODUCT_ENABLE,
} from './constants';
import { setCategories, setProducts, setSelectedProducts } from './actions';

function* doGetAllProducts(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllProducts, action.payload);
    yield put(setProducts(response));
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doGetCategories() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCategories);
    yield put(setCategories(response));
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doGetSelectedProducts(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getSelectedProducts, action.payload);
    yield put(setSelectedProducts(response));
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doAddBasket(action) {
  yield put(setLoading(true));
  try {
    yield call(setBasket, action.payload);
    window.location.reload();
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doDeleteProducts(action) {
  yield put(setLoading(true));
  try {
    yield call(deleteProducts, action.payload);
    window.location.reload();
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doDeleteCategory(action) {
  yield put(setLoading(true));
  try {
    yield call(deleteCategory, action.payload);
    window.location.reload();
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doAddCategory(action) {
  yield put(setLoading(true));
  try {
    yield call(addCategory, action.payload);
    window.location.reload();
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doEnableProduct(action) {
  yield put(setLoading(true));
  try {
    yield call(enableProduct, action.payload);
    window.location.reload();
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doDisableProduct(action) {
  yield put(setLoading(true));
  try {
    yield call(disableProduct, action.payload);
    window.location.reload();
  } catch (error) {
    toast.error(error.response.data.message || error.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* productSaga() {
  yield takeLatest(GET_ALL_PRODUCTS, doGetAllProducts);
  yield takeLatest(GET_CATEGORIES, doGetCategories);
  yield takeLatest(GET_SELECTED_PRODUCTS, doGetSelectedProducts);
  yield takeLatest(SET_BASKET, doAddBasket);
  yield takeLatest(DELETE_PRODUCTS, doDeleteProducts);
  yield takeLatest(DELETE_CATEGORY, doDeleteCategory);
  yield takeLatest(ADD_CATEGORY, doAddCategory);
  yield takeLatest(SET_PRODUCT_ENABLE, doEnableProduct);
  yield takeLatest(SET_PRODUCT_DISABLE, doDisableProduct);
}
