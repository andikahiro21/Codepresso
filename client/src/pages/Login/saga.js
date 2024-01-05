import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { login as loginApi, googleLogin as googleLoginApi } from '@domain/api';
import { SET_LOGIN, SET_TOKEN } from '@containers/Client/constants';
import { setLoading } from '@containers/App/actions';
import { app } from '@utils/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { loginFailure } from './actions';
import { GOOGLE_LOGIN, LOGIN_REQUEST } from './constants';

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

function* googleLogin() {
  yield put(setLoading(true));
  try {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const result = yield call(signInWithPopup, auth, provider);

    const user = result._tokenResponse;
    const response = yield call(googleLoginApi, {
      fullName: user.fullName,
      email: user.email,
      image: user.photoUrl,
    });
    if (response) {
      yield put({ type: SET_LOGIN, login: true });
      yield put({ type: SET_TOKEN, token: response.data });
    }
  } catch (e) {
    toast.error(e.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(GOOGLE_LOGIN, googleLogin);
}
