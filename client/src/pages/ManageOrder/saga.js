import { call, put, takeLatest } from 'redux-saga/effects';

import { logoutUser } from '@containers/Client/actions';
import { setLoading, showPopup } from '@containers/App/actions';
import { getAllOrderAdmin } from '@domain/api';
import { GET_ALL_PURCHASE_ADMIN } from './constants';
import { setAllOrderAdmin } from './actions';

function* doGetAllOrderAdmin(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllOrderAdmin, action.payload);
    yield put(setAllOrderAdmin(response));
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

export function* manageOrderSaga() {
  yield takeLatest(GET_ALL_PURCHASE_ADMIN, doGetAllOrderAdmin);
}
