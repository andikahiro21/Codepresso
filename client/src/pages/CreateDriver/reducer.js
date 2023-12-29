import { produce } from 'immer';

import { REGISTER_DRIVER_FAILURE } from './constants';

export const initialState = {
  registerDriverError: '',
};

const registerDriverReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REGISTER_DRIVER_FAILURE:
        draft.registerDriverError = action.message;
        break;
    }
  });

export default registerDriverReducer;
