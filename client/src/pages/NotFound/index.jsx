import { FormattedMessage } from 'react-intl';

import { getAssetImages } from '@utils/assetHelper';

import classes from './style.module.scss';

const NotFound = () => (
  <div className={classes.contentWrapper}>
    <img className={classes.image} src={getAssetImages('not-found', '/src/static/images/not-found.png')} alt="Not Found" />
    <div className={classes.title}>
      <FormattedMessage id="app_not_found" />
    </div>
  </div>
);

export default NotFound;
