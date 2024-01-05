import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AssignmentTurnedIn } from '@mui/icons-material';

import { selectFinishedOrder } from './selectors';
import { getFinishedPurchase } from './actions';

import classes from './style.module.scss';

const FinishedOrder = ({ finishedOrder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFinishedPurchase());
  }, [dispatch]);

  const handleClick = () => {
    navigate(`/detail-order/${finishedOrder?.data?.id}`);
  };

  return (
    <div className={classes.orderHistory}>
      <div className={classes.orderTitle}>
        <FormattedMessage id="app_finished_order_title" />
      </div>
      <div className={classes.orderCont}>
        {finishedOrder.data !== null ? (
          <div className={classes.order}>
            <div className={classes.left}>
              <div className={classes.imgContainer}>
                <AssignmentTurnedIn />
              </div>
              <div className={classes.statusCont}>
                <div className={classes.note}>{finishedOrder?.data?.user_receiver?.full_name}</div>
                <div className={classes.reveiverName}>{finishedOrder?.data?.status}</div>
                <div className={classes.reveiverName}>{new Date(finishedOrder?.data?.updatedAt).toLocaleString()}</div>
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <button type="button" onClick={handleClick}>
                <FormattedMessage id="app_finished_order_track" />
              </button>
            </div>
          </div>
        ) : (
          <div className={classes.noFound}>
            <FormattedMessage id="app_finished_order_no_data" />
          </div>
        )}
      </div>
    </div>
  );
};

FinishedOrder.propTypes = {
  finishedOrder: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  finishedOrder: selectFinishedOrder,
});

export default connect(mapStateToProps)(FinishedOrder);
