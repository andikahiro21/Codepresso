/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { selectLogin, selectToken } from '@containers/Client/selectors';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import classes from './style.module.scss';

const ProductCard = ({ name, description, price, image, login, token, id }) => {
  const navigate = useNavigate();
  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }
  const handleOrder = (data) => {
    alert(data);
  };
  const handleLogin = () => {
    navigate('/login');
  };
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
        {login && decoded ? (
          <button type="button" onClick={() => handleOrder(id)}>
            Add Order
          </button>
        ) : (
          <button type="button" onClick={handleLogin}>
            Add Order
          </button>
        )}
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
