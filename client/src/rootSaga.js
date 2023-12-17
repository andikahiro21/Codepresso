import { clientSaga } from '@containers/Client/saga';
import { purchaseSaga } from '@pages/DetailOrder/saga';
import { forgotSaga } from '@pages/ForgotPassword/saga';
import { loginSaga } from '@pages/Login/saga';
import { orderHistorySaga } from '@pages/OrderHistory/saga';
import { productSaga } from '@pages/Products/saga';
import { registerSaga } from '@pages/Register/saga';
import { resetSaga } from '@pages/ResetPassword/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
    forgotSaga(),
    resetSaga(),
    productSaga(),
    clientSaga(),
    purchaseSaga(),
    orderHistorySaga(),
  ]);
}
