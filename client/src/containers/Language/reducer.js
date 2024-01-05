import { produce } from 'immer';
import { merge } from 'lodash';

import id from '@languages/id';
import en from '@languages/en';

import { SET_MESSAGES, SET_TRANSLATION } from '@containers/Language/constants';

export const initialState = {
  messages: {
    id: { ...id },
    en: { ...en },
  },
};

const languageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MESSAGES:
        draft.messages = action.messages;
        break;
      case SET_TRANSLATION:
        draft.messages = merge(draft.messages, action.translations);
        break;
    }
  });

export default languageReducer;
