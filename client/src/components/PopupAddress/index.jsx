/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable arrow-body-style */
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createStructuredSelector } from 'reselect';
import { deleteAddress } from '@containers/Client/actions';
import { selectAddress, selectLogin, selectToken } from '@containers/Client/selectors';
import classes from './style.module.scss';

const PopupAddress = ({ open, handleClose, address, handleOpenCreate }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
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
        <div className={classes.cardTitle}>Manage Address</div>
        <button type="button" onClick={handleOpenCreate}>
          Add Address
        </button>
        <div className={classes.addressCont}>
          {address?.map((addr) => (
            <div className={classes.address} key={addr?.id}>
              <div className={classes.addressName}> {addr?.address_name}</div>
              <div
                className={classes.action}
                onClick={() => {
                  handleDelete(addr.id);
                }}
              >
                <DeleteIcon className={classes.deleteIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

PopupAddress.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  address: PropTypes.array,
  handleOpenCreate: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  address: selectAddress,
});

export default connect(mapStateToProps)(PopupAddress);
