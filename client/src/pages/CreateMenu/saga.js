import { call, put, takeLatest } from 'redux-saga/effects';

import { logoutUser } from '@containers/Client/actions';
import { setLoading } from '@containers/App/actions';
import { createProducts } from '@domain/api';
import { setCreateError } from './actions';
import { CREATE_MENU } from './constants';

function* doCreateMenu(action) {
  yield put(setLoading(true));
  try {
    const { formDataObj } = action.payload;
    yield call(createProducts, formDataObj);
    window.location.href = '/products';
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(setCreateError(error.response.data.message));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* menuSaga() {
  yield takeLatest(CREATE_MENU, doCreateMenu);
}
