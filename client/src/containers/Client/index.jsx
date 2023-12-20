import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import decryptToken from '@utils/decryptToken';

import { selectLogin, selectToken } from '@containers/Client/selectors';

const Client = ({ login, isAdmin, token, isUser, isDriver, children }) => {
  const decode = token ? decryptToken(token) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate('/login');
    }
  }, [login, navigate]);

  useEffect(() => {
    if (login && isAdmin && decode?.data?.role !== 1) {
      navigate('/');
    }
    if (login && isUser && decode?.data?.role !== 2) {
      navigate('/');
    }
    if (login && isDriver && decode?.data?.role !== 3) {
      navigate('/');
    }
  }, [isAdmin, isUser, isDriver, login, navigate, decode]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isUser: PropTypes.bool,
  isDriver: PropTypes.bool,
  children: PropTypes.element,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
});

export default connect(mapStateToProps)(Client);
