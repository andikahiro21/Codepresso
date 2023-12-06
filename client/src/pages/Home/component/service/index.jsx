import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import deliveryLogo from '@static/images/delivery.png';
import workshopLogo from '@static/images/workshop.png';
import storeLogo from '@static/images/store.png';

import classes from './style.module.scss';

const Service = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className={classes.service}>
      <div className={classes.titleCont}>
        <div className={classes.title}>
          <FormattedMessage id="app_service_title" />
        </div>
      </div>
      <div className={classes.cardContainer}>
        <div className={classes.card}>
          <div className={classes.logo}>
            <img src={deliveryLogo} alt="logo" />
          </div>
          <div className={classes.name}>
            <FormattedMessage id="app_service_delivery" />
          </div>
          <div className={classes.desc}>
            <FormattedMessage id="app_service_delivery_desc" />
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.logo}>
            <img src={storeLogo} alt="logo" />
          </div>
          <div className={classes.name}>
            <FormattedMessage id="app_service_store" />
          </div>
          <div className={classes.desc}>
            <FormattedMessage id="app_service_store_desc" />
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.logo}>
            <img src={workshopLogo} alt="logo" />
          </div>
          <div className={classes.name}>
            <FormattedMessage id="app_service_workshop" />
          </div>
          <div className={classes.desc}>
            <FormattedMessage id="app_service_workshop_desc" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Service;
