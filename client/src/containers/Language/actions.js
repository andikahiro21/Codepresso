import { SET_MESSAGES, GET_TRANSLATION, SET_TRANSLATION } from '@containers/Language/constants';

export const setMessages = (messages) => ({
  type: SET_MESSAGES,
  messages,
});

export const getTranslations = () => ({
  type: GET_TRANSLATION,
});

export const setTranslations = (translations) => ({
  type: SET_TRANSLATION,
  translations,
});
