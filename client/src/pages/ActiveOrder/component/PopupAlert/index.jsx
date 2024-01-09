/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { Dialog } from '@mui/material';

import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { createStructuredSelector } from 'reselect';
import { deleteChannel, setFinishOrder } from '@pages/ActiveOrder/actions';

const PopupAlert = ({ open, handleClose, id, items }) => {
  const dispatch = useDispatch();

  const handleFinishOrder = () => {
    const data = {
      driverId: items?.driver_id,
      userId: items?.user_id,
    };
    dispatch(deleteChannel(data));
    dispatch(setFinishOrder(id));
  };

  console.log(items?.driver_id);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <FormattedMessage id="app_active_order_order_finished" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage id="app_active_order_alert" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleFinishOrder} autoFocus>
          <FormattedMessage id="app_active_order_order_finished" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PopupAlert.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  id: PropTypes.number,
  items: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(PopupAlert);
