import { call, put, takeLatest } from 'redux-saga/effects';
import { getAddress } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';
import { GET_ADDRESS } from './constants';
import { setAddress } from './actions';

function* doGetAddress() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAddress);
    yield put(setAddress(response));
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

export function* clientSaga() {
  yield takeLatest(GET_ADDRESS, doGetAddress);
}
