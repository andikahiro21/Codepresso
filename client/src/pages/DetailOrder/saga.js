import { call, put, takeLatest } from 'redux-saga/effects';

import { logoutUser } from '@containers/Client/actions';
import { setLoading, showPopup } from '@containers/App/actions';
import { getHistoryOrder, getMapRoutes } from '@domain/api';
import { setHistoryOrder, setMapRoutes } from './actions';
import { GET_HISTORY_ORDER, GET_ROUTES } from './constants';

function* doGetHistory(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getHistoryOrder, action.payload);
    yield put(setHistoryOrder(response));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doGetMapRoutes(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getMapRoutes, action.payload);
    response.data.routes = JSON.parse(response.data.routes);
    yield put(setMapRoutes(response.data));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* purchaseSaga() {
  yield takeLatest(GET_HISTORY_ORDER, doGetHistory);
  yield takeLatest(GET_ROUTES, doGetMapRoutes);
}
