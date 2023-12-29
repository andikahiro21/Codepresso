/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dialog } from '@mui/material';

import classes from './style.module.scss';

const PopupListOrder = ({ open, handleClose, items }) => {
  return (
    <Dialog
      className={classes.popupListOrder}
      open={open}
      fullWidth="xl"
      maxWidth="md"
      data-testid="popupListOrder"
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={classes.cardContainer}>
        <div className={classes.cardTitle}>
          <FormattedMessage id="app_list_order_title" />
        </div>
        <div className={classes.listOrderContainer}>
          {items?.map((item) => (
            <div className={classes.listOrder}>
              <div className={classes.imgContainer}>
                <div className={classes.img}>
                  <img src={item?.menu_purchase?.image} alt="ProductImage" />
                </div>
              </div>
              <div className={classes.productDesc}>
                <div className={classes.name}>{item?.menu_purchase?.name}</div>
                <div className={classes.addons}>
                  {item?.Size && <div className={classes.size}>{item.Size.name}, </div>}
                  {item?.Bean && <div className={classes.bean}>{item.Bean.name}, </div>}
                  {item?.Sugar && <div className={classes.sugar}>{item.Sugar.name}, </div>}
                  {item?.Milk && <div className={classes.milk}>{item.Milk.name}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

PopupListOrder.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  items: PropTypes.object,
};

export default PopupListOrder;
