import { call, put, takeLatest } from 'redux-saga/effects';

import { logoutUser } from '@containers/Client/actions';
import { setLoading } from '@containers/App/actions';
import { editMenu } from '@domain/api';
import { EDIT_MENU } from './constants';
import { setEditMenu } from './actions';

function* doEditMenu(action) {
  yield put(setLoading(true));
  try {
    const { formDataObj, id } = action.payload;
    yield call(editMenu, formDataObj, id);
    window.location.href = '/products';
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(setEditMenu(error.response.data.message));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* editMenuSaga() {
  yield takeLatest(EDIT_MENU, doEditMenu);
}
