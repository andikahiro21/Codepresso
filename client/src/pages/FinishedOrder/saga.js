import { call, put, takeLatest } from 'redux-saga/effects';

import { logoutUser } from '@containers/Client/actions';
import { setLoading, showPopup } from '@containers/App/actions';
import { getFinishedPurchase } from '@domain/api';
import { setFinishedPurchase } from './actions';
import { GET_FINISHED_PURCHASE } from './constants';

function* doGetFinishedPurchase() {
  yield put(setLoading(true));
  try {
    const response = yield call(getFinishedPurchase);
    yield put(setFinishedPurchase(response));
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

export function* finishedOrderSaga() {
  yield takeLatest(GET_FINISHED_PURCHASE, doGetFinishedPurchase);
}
