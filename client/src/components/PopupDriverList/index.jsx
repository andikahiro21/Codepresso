/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Dialog } from '@mui/material';

import { selectDriverList } from '@pages/ManageOrder/selectors';
import { getDriverList, setChannel, setOrderDelivery } from '@pages/ManageOrder/actions';

import { createStructuredSelector } from 'reselect';
import classes from './style.module.scss';

const PopupDriverList = ({ open, handleClose, items, driverList }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDriverList());
  }, [dispatch]);

  const handleSelectDriver = (id) => {
    const data = {
      id: items.id,
      driverID: id,
    };
    const chat = {
      userId : items.user_id,
      driverId: id,
    }
    dispatch(setOrderDelivery(data));
    dispatch(setChannel(chat))
  };
 

  return (
    <Dialog
      className={classes.popupListDriver}
      open={open}
      fullWidth="sm"
      maxWidth="sm"
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={classes.cardContainer}>
        <div className={classes.cardTitle}>
          <FormattedMessage id="app_list_popup_driver_title" />
        </div>
        <div className={classes.listDriverContainer}>
          {driverList?.data?.map((item) => (
            <div className={classes.listDriver}>
              <div className={classes.imgContainer}>
                <div className={classes.img}>
                  <img src={item.image} alt="Driver" />
                </div>
              </div>
              <div className={classes.productDesc}>
                <div className={classes.name}>{item.name}</div>
                <div className={classes.btnContainer}>
                  <button type="button" onClick={() => handleSelectDriver(item.id)}>
                    <FormattedMessage id="app_list_popup_driver_button" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

PopupDriverList.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  items: PropTypes.object,
  driverList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  driverList: selectDriverList,
});

export default connect(mapStateToProps)(PopupDriverList);
