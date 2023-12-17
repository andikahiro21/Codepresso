import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import purchaseReducer, { storedKey as storedPurchaseState } from '@pages/DetailOrder/reducer';

import languageReducer from '@containers/Language/reducer';

import loginReducer from '@pages/Login/reducer';
import registerReducer from '@pages/Register/reducer';
import forgotReducer from '@pages/ForgotPassword/reducer';
import resetReducer from '@pages/ResetPassword/reducer';
import orderHistoryReducer from '@pages/OrderHistory/reducer';
import productReducer from '@pages/Products/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  purchase: { reducer: purchaseReducer, whitelist: storedPurchaseState },
};

const temporaryReducers = {
  language: languageReducer,
  login: loginReducer,
  register: registerReducer,
  forgotPassword: forgotReducer,
  resetPassword: resetReducer,
  products: productReducer,
  orderHistory: orderHistoryReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
