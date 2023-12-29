import { call, put, takeLatest } from 'redux-saga/effects';
import { login as loginApi } from '@domain/api';
import { SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';
import { setLoading } from '@containers/App/actions';
import { loginFailure } from './actions';
import { LOGIN_REQUEST } from './constants';

function* login(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(loginApi, action.payload);
    yield put({ type: SET_LOGIN, login: true });
    yield put({ type: SET_TOKEN, token: response.data });
  } catch (e) {
    yield put(loginFailure(e.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

export function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
