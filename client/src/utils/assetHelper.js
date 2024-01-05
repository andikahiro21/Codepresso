import isEmpty from 'lodash/isEmpty';

import store from '@store';

export function getAssetImages(imageKey = null, defaultImage = '') {
  const state = store.getState();
  const { assetImages } = state.app;
  if (imageKey && !isEmpty(assetImages)) {
    return assetImages[imageKey] || defaultImage;
  }
  return defaultImage;
}
