import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createAddress,
  deleteAddress,
  deleteBaskets,
  editBaskets,
  getAddress,
  getBaskets,
  getDistance,
  notificationMidtrans,
  payment,
  setActiveAddress,
} from '@domain/api';
import Swal from 'sweetalert2';
import { setLoading, showPopup } from '@containers/App/actions';
import PendingIcon from '@static/images/pendingIcon.png';
import {
  ADD_ADDRESS,
  DELETE_ADDRESS,
  DELETE_BASKETS,
  EDIT_BASKETS,
  GET_ADDRESS,
  GET_BASKETS,
  GET_DISTANCE,
  INITIATE_PAYMENT,
  SET_ACTIVE_ADDRESS,
} from './constants';
import { logoutUser, setAddress, setBaskets, setDistance } from './actions';

function* doGetAddress() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAddress);
    yield put(setAddress(response));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doAddAddress(action) {
  yield put(setLoading(true));
  try {
    yield call(createAddress, action.payload);
    window.location.reload();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doDeleteAddress(action) {
  yield put(setLoading(true));
  try {
    yield call(deleteAddress, action.payload);
    window.location.reload();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doSetActiveAddress(id) {
  yield put(setLoading(true));
  try {
    yield call(setActiveAddress, id);
    window.location.reload();
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doGetBaskets() {
  yield put(setLoading(true));
  try {
    const response = yield call(getBaskets);
    yield put(setBaskets(response));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doEditBaskets(action) {
  yield put(setLoading(true));
  try {
    const { id } = action.data;
    const { data } = action.data;
    yield call(editBaskets, { id, data });
    window.location.reload();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doDeleteBaskets(action) {
  yield put(setLoading(true));
  try {
    yield call(deleteBaskets, action.payload);
    window.location.reload();
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

function* doGetDistance() {
  yield put(setLoading(true));
  try {
    const response = yield call(getDistance);
    yield put(setDistance(response));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doPayment(action) {
  function* paymentPending() {
    Swal.fire({
      title: 'Your payment is being processed',
      text: 'Please complete your payment',
      imageUrl: PendingIcon,
      imageWidth: 100,
      imageHeight: 100,
      showConfirmButton: false,
      imageAlt: 'Pending image',
    });

    yield new Promise((resolve) => {
      setTimeout(() => {
        Swal.close();
        resolve();
      }, 10000);
    });
  }
  function* callSuccessNotification(token) {
    try {
      yield call(notificationMidtrans, token);

      Swal.fire({
        title: 'Payment Successful',
        text: 'Your payment has been successfully processed.',
        icon: 'success',
      });
      // .then((result) => {
      //   if (result.isConfirmed) {
      //     window.location.href = '/order';
      //   }
      // });
    } catch (error) {
      yield put(error(error.message));
    }
  }
  try {
    const response = yield call(payment, action.payload);
    const { paymentUrl, tokenData } = response;

    if (paymentUrl) {
      window.open(response.paymentUrl, '_blank');
    }

    yield call(paymentPending);
    yield call(callSuccessNotification, tokenData);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'Token invalid, please login again') {
      yield put(logoutUser());
    }
  }
}

export function* clientSaga() {
  yield takeLatest(GET_ADDRESS, doGetAddress);
  yield takeLatest(DELETE_ADDRESS, doDeleteAddress);
  yield takeLatest(SET_ACTIVE_ADDRESS, doSetActiveAddress);
  yield takeLatest(GET_BASKETS, doGetBaskets);
  yield takeLatest(EDIT_BASKETS, doEditBaskets);
  yield takeLatest(DELETE_BASKETS, doDeleteBaskets);
  yield takeLatest(GET_DISTANCE, doGetDistance);
  yield takeLatest(INITIATE_PAYMENT, doPayment);
  yield takeLatest(ADD_ADDRESS, doAddAddress);
}
