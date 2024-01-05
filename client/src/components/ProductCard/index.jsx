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

const ProductCard = ({ product, login, token, handleClick }) => {
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
    dispatch(setProductDisable(product?.id));
  };

  const handleEnable = () => {
    dispatch(setProductEnable(product?.id));
  };

  const ActionButton = () => {
    const role = login && decoded?.data?.role;
    const button = {
      1: (
        <div className={`${classes.adminAction}`}>
          {product.status ? (
            <VisibilityIcon onClick={handleDisable} className={classes.visibilityIcon} />
          ) : (
            <VisibilityOffIcon onClick={handleEnable} className={classes.visibilityOffIcon} />
          )}
          <EditIcon
            className={classes.editIcon}
            onClick={() => {
              navigate(`/edit-menu/${product?.id}`);
            }}
          />
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={() => {
              dispatch(deleteProducts(product?.id));
            }}
          />
        </div>
      ),
      2: (
        <button type="button" onClick={() => handleClick(product?.id)} disabled={!product?.status}>
          {!product?.status ? 'Sold Out' : 'Add Order'}
        </button>
      ),
      default: (
        <button type="button" onClick={handleLogin} disabled={!product?.status}>
          {!product?.status ? 'Sold Out' : 'Add Order'}
        </button>
      ),
    };

    return button[role] || button.default;
  };

  return (
    <Card className={classes.card}>
      <div className={classes.imgContainer}>
        <img src={product?.image} alt="Logo" className={`${!product?.status && classes.imgDisable}`} />
      </div>
      <div className={classes.cardContent}>
        <div className={classes.title}>{product?.name}</div>
        <div className={classes.desc}>{product?.description}</div>
      </div>
      <CardActions className={classes.action}>
        <div className={classes.priceContainer}>
          <div className={classes.currency}>Rp</div>
          <div className={classes.price}>{product?.price}</div>
        </div>
        <ActionButton />
      </CardActions>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
});

ProductCard.propTypes = {
  product: PropTypes.object,
  login: PropTypes.bool,
  token: PropTypes.string,
};

export default connect(mapStateToProps)(ProductCard);
