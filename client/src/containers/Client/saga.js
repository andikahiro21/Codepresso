import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteBaskets, editBaskets, getAddress, getBaskets, getDistance, setActiveAddress } from '@domain/api';
import { setLoading, showPopup } from '@containers/App/actions';
import { DELETE_BASKETS, EDIT_BASKETS, GET_ADDRESS, GET_BASKETS, GET_DISTANCE, SET_ACTIVE_ADDRESS } from './constants';
import { setAddress, setBaskets, setDistance } from './actions';

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

function* doSetActiveAddress(id) {
  yield put(setLoading(true));
  try {
    yield call(setActiveAddress, id);
    window.location.reload();
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doGetBaskets() {
  yield put(setLoading(true));
  try {
    const response = yield call(getBaskets);
    yield put(setBaskets(response));
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doEditBaskets(action) {
  yield put(setLoading(true));
  try {
    const { id } = action.data;
    const { data } = action.data;
    yield call(editBaskets, { id, data });
    window.location.reload();
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doDeleteBaskets(action) {
  yield put(setLoading(true));
  try {
    yield call(deleteBaskets, action.payload);
    window.location.reload();
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doGetDistance() {
  yield put(setLoading(true));
  try {
    const response = yield call(getDistance);
    yield put(setDistance(response));
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

export function* clientSaga() {
  yield takeLatest(GET_ADDRESS, doGetAddress);
  yield takeLatest(SET_ACTIVE_ADDRESS, doSetActiveAddress);
  yield takeLatest(GET_BASKETS, doGetBaskets);
  yield takeLatest(EDIT_BASKETS, doEditBaskets);
  yield takeLatest(DELETE_BASKETS, doDeleteBaskets);
  yield takeLatest(GET_DISTANCE, doGetDistance);
}
