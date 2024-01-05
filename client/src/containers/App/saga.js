import { call, put, takeLatest } from 'redux-saga/effects';
import { getTranslations, getAssets } from '@domain/api';
import { setTranslations } from '@containers/Language/actions';
import { GET_TRANSLATION } from '@containers/Language/constants';
import { GET_ASSETS } from './constants';
import { setLoading, showPopup, setAsset } from './actions';

function* doGetTranslations() {
  yield put(setLoading(true));
  try {
    const response = yield call(getTranslations);
    yield put(setTranslations(response));
  } catch (error) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doGetAsset() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAssets);
    yield put(setAsset(response.data))
  } catch (error) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

export function* appSaga() {
  yield takeLatest(GET_TRANSLATION, doGetTranslations);
  yield takeLatest(GET_ASSETS, doGetAsset);
}