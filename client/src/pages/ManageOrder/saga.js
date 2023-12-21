import { call, put, takeLatest } from 'redux-saga/effects';

import { logoutUser } from '@containers/Client/actions';
import { setLoading, showPopup } from '@containers/App/actions';
import { driverList, getAllOrderAdmin, setOrderDelivery } from '@domain/api';
import { GET_ALL_PURCHASE_ADMIN, GET_DRIVER_LIST, SET_ORDER_DELIVERY } from './constants';
import { setAllOrderAdmin, setDriverList } from './actions';

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

function* doSetOrderDelivery(action) {
  yield put(setLoading(true));
  try {
    const { id, driverID } = action.payload;
    console.log(action.payload);
    yield call(setOrderDelivery, id, driverID);
    window.location.reload();
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

function* doGetDriverList() {
  yield put(setLoading(true));
  try {
    const response = yield call(driverList);
    yield put(setDriverList(response));
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
  yield takeLatest(SET_ORDER_DELIVERY, doSetOrderDelivery);
  yield takeLatest(GET_DRIVER_LIST, doGetDriverList);
}
