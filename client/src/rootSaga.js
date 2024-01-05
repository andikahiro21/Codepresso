import { appSaga } from '@containers/App/saga';
import { clientSaga } from '@containers/Client/saga';
import { activeOrderSaga } from '@pages/ActiveOrder/saga';
import { registerDriverSaga } from '@pages/CreateDriver/saga';
import { menuSaga } from '@pages/CreateMenu/saga';
import { purchaseSaga } from '@pages/DetailOrder/saga';
import { editMenuSaga } from '@pages/EditMenu/saga';
import { forgotSaga } from '@pages/ForgotPassword/saga';
import { loginSaga } from '@pages/Login/saga';
import { manageOrderSaga } from '@pages/ManageOrder/saga';
import { orderHistorySaga } from '@pages/OrderHistory/saga';
import { productSaga } from '@pages/Products/saga';
import { registerSaga } from '@pages/Register/saga';
import { resetSaga } from '@pages/ResetPassword/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    registerSaga(),
    forgotSaga(),
    resetSaga(),
    productSaga(),
    clientSaga(),
    purchaseSaga(),
    orderHistorySaga(),
    menuSaga(),
    editMenuSaga(),
    registerDriverSaga(),
    manageOrderSaga(),
    activeOrderSaga(),
  ]);
}
