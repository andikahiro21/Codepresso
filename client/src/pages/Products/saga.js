import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteProducts, getAllProducts, getCategories, getSelectedProducts, setBasket } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';
import { DELETE_PRODUCTS, GET_ALL_PRODUCTS, GET_CATEGORIES, GET_SELECTED_PRODUCTS, SET_BASKET } from './constants';
import { setCategories, setProducts, setSelectedProducts } from './actions';

function* doGetAllProducts() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllProducts);
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
    alert(error.response.data.message);
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
}
