import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllProducts, getCategories } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';
import { GET_ALL_PRODUCTS, GET_CATEGORIES } from './constants';
import { setCategories, setProducts } from './actions';

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

export function* productSaga() {
  yield takeLatest(GET_ALL_PRODUCTS, doGetAllProducts);
  yield takeLatest(GET_CATEGORIES, doGetCategories);
}
