/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { deleteProducts } from '@pages/Products/actions';

import { selectLogin, selectToken } from '@containers/Client/selectors';

import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardActions from '@mui/material/CardActions';

import classes from './style.module.scss';

const ProductCard = ({ name, description, price, image, login, token, id, handleClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }
  const handleLogin = () => {
    navigate('/login');
  };

  let actionButton = null;

  if (login && decoded?.data?.role === 2) {
    actionButton = (
      <button type="button" onClick={() => handleClick(id)}>
        Add Order
      </button>
    );
  } else if (decoded?.data?.role === 1) {
    actionButton = (
      <div className={classes.adminAction}>
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
      <button type="button" onClick={handleLogin}>
        Add Order
      </button>
    );
  }

  return (
    <Card className={classes.card}>
      <div className={classes.imgContainer}>
        <img src={image} alt="Logo" />
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
};

export default connect(mapStateToProps)(ProductCard);
