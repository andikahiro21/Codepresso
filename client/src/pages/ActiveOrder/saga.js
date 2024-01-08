import { call, put, takeLatest } from 'redux-saga/effects';

import { logoutUser } from '@containers/Client/actions';
import { setLoading, showPopup } from '@containers/App/actions';
import { deleteChannel, getActivePurchase, getToken, setFinishOrder } from '@domain/api';
import { setActivePurchase, setTokenChat } from './actions';
import { DELETE_CHANNEL, GET_ACTIVE_PURCHASE, GET_TOKEN_CHAT, SET_FINISH_ORDER } from './constants';

function* doGetActivePurchase() {
  yield put(setLoading(true));
  try {
    const response = yield call(getActivePurchase);
    yield put(setActivePurchase(response));
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

function* dosetFinishOrder(action) {
  yield put(setLoading(true));
  try {
    yield call(setFinishOrder, action.payload);
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

function* doGetToken() {
  yield put(setLoading(true));
  try {
    const response = yield call(getToken);
    yield put(setTokenChat(response.data.token));
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

function* doDeleteChannel(action) {
  yield put(setLoading(true));
  try {
    yield call(deleteChannel, action.payload);
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

export function* activeOrderSaga() {
  yield takeLatest(GET_ACTIVE_PURCHASE, doGetActivePurchase);
  yield takeLatest(SET_FINISH_ORDER, dosetFinishOrder);
  yield takeLatest(GET_TOKEN_CHAT, doGetToken);
  yield takeLatest(DELETE_CHANNEL, doDeleteChannel);
}
