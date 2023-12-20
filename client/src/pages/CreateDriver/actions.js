import { REGISTER_DRIVER_FAILURE, REGISTER_DRIVER_REQUEST } from './constants';

export const registerDriverRequest = (data) => ({
  type: REGISTER_DRIVER_REQUEST,
  payload: data,
});

export const registerDriverFailure = (message) => ({
  type: REGISTER_DRIVER_FAILURE,
  message,
});
