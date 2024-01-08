import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Macchiato from '@static/images/delivery.png';

import { selectActiveOrder } from './selectors';
import { getActivePurchase } from './actions';

import ChatDialog from '@components/ChatDialog';
import PopupAlert from './component/PopupAlert';

import classes from './style.module.scss';

const ActiveOrder = ({ activePurchase }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [chatDialog, setChatDialog] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenChat = () => {
    setChatDialog(true);
  };

  const handleCloseChat = () => {
    setChatDialog(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getActivePurchase());
  }, [dispatch]);

  const handleClick = () => {
    navigate(`/detail-order/${activePurchase?.data?.id}`);
  };
  console.log(activePurchase?.data);

  return (
    <div className={classes.orderHistory}>
      <ChatDialog open={chatDialog} onClose={handleCloseChat} items={activePurchase?.data} />
      <PopupAlert open={open} handleClose={handleClose} id={activePurchase?.data?.id} items={activePurchase?.data} />
      <div className={classes.orderTitle}>
        <FormattedMessage id="app_active_order_title" />
      </div>
      <div className={classes.orderCont}>
        {activePurchase.data !== null ? (
          <div className={classes.order}>
            <div className={classes.left}>
              <div className={classes.imgContainer}>
                <img src={Macchiato} alt="product" />
              </div>
              <div className={classes.statusCont}>
                <div className={classes.reveiverName}>{activePurchase?.data?.note}</div>
                <div className={classes.note}>{activePurchase?.data?.user_receiver?.full_name}</div>
              </div>
            </div>
            <div className={classes.btnChat}>
              <button type="button" onClick={handleOpenChat}>
                Chat
              </button>
            </div>

            <div className={classes.buttonContainer}>
              <button type="button" onClick={handleClick}>
                <FormattedMessage id="app_active_order_track" />
              </button>
              <button type="button" onClick={handleClickOpen}>
                <FormattedMessage id="app_active_order_order_finished" />
              </button>
            </div>
          </div>
        ) : (
          <div className={classes.noFound}>
            <FormattedMessage id="app_active_order_no_data" />
          </div>
        )}
      </div>
    </div>
  );
};

ActiveOrder.propTypes = {
  activePurchase: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  activePurchase: selectActiveOrder,
});

export default connect(mapStateToProps)(ActiveOrder);
