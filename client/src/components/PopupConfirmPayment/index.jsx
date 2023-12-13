/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable arrow-body-style */
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { getDistance } from '@containers/Client/actions';
import { selectDistance } from '@containers/Client/selectors';
import classes from './style.module.scss';

const PopupConfirmPayment = ({ open, handleClose, distance }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistance());
  }, [dispatch]);

  console.log(distance?.total);

  const deliveryCost = distance?.deliveryCost;
  const distanceRange = distance?.distance;
  const priceItems = distance?.total;

  return (
    <Dialog
      className={classes.popupOrder}
      open={open}
      fullWidth="xl"
      maxWidth="sm"
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={classes.cardContainer}>
        <div className={classes.cardTitle}>Payment Details</div>
        <div className={classes.bodyPayment}>
          <div className={classes.productsPayment}>
            <div className={classes.title}>Items Cost</div>
            <div className={classes.cost}>{`Rp ${priceItems}`}</div>
          </div>
          <div className={classes.productsPayment}>
            <div className={classes.title}>{`Delivery Cost (${distanceRange}km)`}</div>
            <div className={classes.cost}>{`Rp ${deliveryCost}`}</div>
          </div>
          <div className={classes.productsPayment}>
            <div className={classes.title}>Total Payment</div>
            <div className={classes.cost}>{`Rp ${priceItems + deliveryCost}`}</div>
          </div>
        </div>
        <div className={classes.checkout}>
          <div className={classes.header}>
            <div className={classes.titleHeader}>Total</div>
            <div className={classes.checkoutPriceCont}>
              <div className={classes.checkoutPrice}>
                <div className={classes.checkoutCurrency}>Rp</div>
                <div className={classes.checkoutValue}>{priceItems + deliveryCost}</div>
              </div>
            </div>
          </div>
          <div className={classes.btnContainer}>
            <button type="button">Choose Payment Methods</button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

PopupConfirmPayment.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  distance: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  distance: selectDistance,
});

export default connect(mapStateToProps)(PopupConfirmPayment);
