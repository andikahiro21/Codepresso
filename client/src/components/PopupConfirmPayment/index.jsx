/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { jwtDecode } from 'jwt-decode';
import { getDistance, initiatePayment } from '@containers/Client/actions';
import { selectDistance, selectLogin, selectToken } from '@containers/Client/selectors';
import classes from './style.module.scss';

const PopupConfirmPayment = ({ open, handleClose, distance, login, token }) => {
  const dispatch = useDispatch();
  const [isOutOfRange, setIsOutOfRange] = useState(false);

  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }

  useEffect(() => {
    if (login && decoded && decoded?.data?.role === 2) {
      dispatch(getDistance());
    }
  }, [dispatch]);

  useEffect(() => {
    setIsOutOfRange(distance?.distance > 10);
  }, [distance]);

  const deliveryCost = distance?.deliveryCost;
  const distanceRange = distance?.distance;
  const priceItems = distance?.total;

  const handlePaymentButtonClick = async () => {
    const note = document.getElementById('note').value;
    const data = {
      note,
      distance: distanceRange,
    };

    dispatch(initiatePayment(data));
    handleClose();
  };

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
          <div className={classes.notePayment}>
            <div className={classes.title}>Note Spesific Address</div>
            <textarea name="note" id="note" cols="30" rows="4" placeholder="RT/RW House Number" />
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
            <button type="button" onClick={handlePaymentButtonClick} disabled={isOutOfRange}>
              {isOutOfRange ? 'Out of Range' : 'Choose Payment Methods'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

PopupConfirmPayment.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  distance: PropTypes.object,
  login: PropTypes.bool,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  distance: selectDistance,
  login: selectLogin,
  token: selectToken,
});

export default connect(mapStateToProps)(PopupConfirmPayment);
