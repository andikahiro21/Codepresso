/* eslint-disable arrow-body-style */
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteBaskets, editBaskets, getBaskets } from '@containers/Client/actions';
import { createStructuredSelector } from 'reselect';
import { selectBaskets, selectLogin, selectToken } from '@containers/Client/selectors';
import classes from './style.module.scss';

const PopupBaskets = ({ open, handleClose, baskets, handleClickOpenPayment, login, token }) => {
  const dispatch = useDispatch();
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }

  useEffect(() => {
    if (login && decoded) {
      dispatch(getBaskets());
    }
  }, [dispatch]);

  const handleQTY = (basketItem, operation) => {
    const newQty = operation === 'increment' ? basketItem.qty + 1 : basketItem.qty - 1;
    const finalQty = Math.max(newQty, 1);
    const data = {
      qty: finalQty,
    };
    dispatch(editBaskets({ id: basketItem.id, data }));
  };
  const handleDelete = (id) => {
    dispatch(deleteBaskets(id));
  };

  const calculateTotalValue = () => {
    return baskets?.reduce((total, basketItem) => total + basketItem.price, 0);
  };

  return (
    <Dialog
      className={classes.popupOrder}
      open={open}
      fullWidth="xl"
      maxWidth="md"
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={classes.cardContainer}>
        <div className={classes.cardTitle}>Cart Items</div>
        <div className={classes.basketsContainer}>
          {baskets?.map((basketItem) => (
            <div key={basketItem.id} className={classes.basket}>
              <div className={classes.imgContainer}>
                <div className={classes.img}>
                  <img src={basketItem?.menu_basket?.image} alt="ProductImage" />
                </div>
              </div>
              <div className={classes.productDesc}>
                <div className={classes.name}>{basketItem?.menu_basket?.name}</div>
                <div className={classes.addons}>
                  {basketItem?.Size && <div className={classes.size}>{basketItem.Size.name}, </div>}
                  {basketItem?.Bean && <div className={classes.bean}>{basketItem.Bean.name}, </div>}
                  {basketItem?.Sugar && <div className={classes.sugar}>{basketItem.Sugar.name}, </div>}
                  {basketItem?.Milk && <div className={classes.milk}>{basketItem.Milk.name}</div>}
                </div>
                <div className={classes.actions}>
                  <div className={classes.leftActions}>
                    <div className={classes.qtyCont}>
                      <div className={classes.qty}>
                        <button
                          type="button"
                          onClick={() => handleQTY(basketItem, 'decrement')}
                          disabled={basketItem.qty === 1}
                        >
                          -
                        </button>
                        <div className={classes.qtyValue}>{basketItem?.qty}</div>
                        <button type="button" onClick={() => handleQTY(basketItem, 'increment')}>
                          +
                        </button>
                      </div>
                      <div className={classes.delete} onClick={() => handleDelete(basketItem?.id)}>
                        <DeleteIcon className={classes.deleteIcon} />
                      </div>
                    </div>
                  </div>
                  <div className={classes.rightActions}>
                    <div className={classes.totalPriceCont}>
                      <div className={classes.totalPrice}>
                        <div className={classes.totalCurrency}>Rp</div>
                        <div className={classes.totalValue}>{basketItem?.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className={classes.checkout}>
            <div className={classes.header}>
              <div className={classes.titleHeader}>Total</div>
              <div className={classes.checkoutPriceCont}>
                <div className={classes.items}>{baskets?.length} Items -.</div>
                <div className={classes.checkoutPrice}>
                  <div className={classes.checkoutCurrency}>Rp</div>
                  <div className={classes.checkoutValue}>{calculateTotalValue()}</div>
                </div>
              </div>
            </div>
            <div className={classes.btnContainer}>
              <button type="button" onClick={handleClickOpenPayment}>
                Checkout the Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

PopupBaskets.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleClickOpenPayment: PropTypes.func,
  baskets: PropTypes.array,
  login: PropTypes.bool,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  baskets: selectBaskets,
  login: selectLogin,
  token: selectToken,
});

export default connect(mapStateToProps)(PopupBaskets);
