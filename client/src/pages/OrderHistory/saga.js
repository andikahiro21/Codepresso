import { call, put, takeLatest } from 'redux-saga/effects';

import { logoutUser } from '@containers/Client/actions';
import { setLoading, showPopup } from '@containers/App/actions';
import { getAllOrder } from '@domain/api';
import { GET_ALL_PURCHASE } from './constants';
import { setAllOrder } from './actions';

function* doGetAllOrder(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllOrder, action.payload);
    yield put(setAllOrder(response));
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

export function* orderHistorySaga() {
  yield takeLatest(GET_ALL_PURCHASE, doGetAllOrder);
}
