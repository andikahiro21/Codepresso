/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { deleteProducts, setProductDisable, setProductEnable } from '@pages/Products/actions';

import { selectLogin, selectToken } from '@containers/Client/selectors';

import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardActions from '@mui/material/CardActions';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import classes from './style.module.scss';

const ProductCard = ({ name, description, price, image, login, token, id, handleClick, qty }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }
  const handleLogin = () => {
    navigate('/login');
  };

  const handleDisable = () => {
    dispatch(setProductDisable(id));
  };

  const handleEnable = () => {
    dispatch(setProductEnable(id));
  };

  let actionButton = null;

  if (login && decoded?.data?.role === 2) {
    actionButton = (
      <button type="button" onClick={() => handleClick(id)} disabled={qty === 0}>
        {qty === 0 ? 'Sold Out' : 'Add Order'}
      </button>
    );
  } else if (decoded?.data?.role === 1) {
    actionButton = (
      <div className={`${classes.adminAction}`}>
        {qty === 1 ? (
          <VisibilityIcon onClick={handleDisable} className={classes.visibilityIcon} />
        ) : (
          <VisibilityOffIcon onClick={handleEnable} className={classes.visibilityOffIcon} />
        )}
        <EditIcon
          className={classes.editIcon}
          onClick={() => {
            navigate(`/edit-menu/${id}`);
          }}
        />
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => {
            dispatch(deleteProducts(id));
          }}
        />
      </div>
    );
  } else {
    actionButton = (
      <button type="button" onClick={handleLogin} disabled={qty === 0}>
        {qty === 0 ? 'Sold Out' : 'Add Order'}
      </button>
    );
  }

  return (
    <Card className={classes.card}>
      <div className={classes.imgContainer}>
        <img src={image} alt="Logo" className={`${qty === 0 ? classes.imgDisable : ''}`} />
      </div>
      <div className={classes.cardContent}>
        <div className={classes.title}>{name}</div>
        <div className={classes.desc}>{description}</div>
      </div>
      <CardActions className={classes.action}>
        <div className={classes.priceContainer}>
          <div className={classes.currency}>Rp</div>
          <div className={classes.price}>{price}</div>
        </div>
        {actionButton}
      </CardActions>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
});

ProductCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  login: PropTypes.bool,
  token: PropTypes.string,
  qty: PropTypes.number,
};

export default connect(mapStateToProps)(ProductCard);
