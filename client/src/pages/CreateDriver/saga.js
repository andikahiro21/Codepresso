import { call, put, takeLatest } from 'redux-saga/effects';
import { registerDriver } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { logoutUser } from '@containers/Client/actions';
import { registerDriverFailure } from './actions';
import { REGISTER_DRIVER_REQUEST } from './constants';

function* doRegisterDriver(action) {
  yield put(setLoading(true));
  try {
    const { formDataObj } = action.payload;
    yield call(registerDriver, formDataObj);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(registerDriverFailure(error.response.data.message));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* registerDriverSaga() {
  yield takeLatest(REGISTER_DRIVER_REQUEST, doRegisterDriver);
}
