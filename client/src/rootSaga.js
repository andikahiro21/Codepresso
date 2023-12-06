import { forgotSaga } from '@pages/ForgotPassword/saga';
import { loginSaga } from '@pages/Login/saga';
import { registerSaga } from '@pages/Register/saga';
import { resetSaga } from '@pages/ResetPassword/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([loginSaga(), registerSaga(), forgotSaga(), resetSaga()]);
}
