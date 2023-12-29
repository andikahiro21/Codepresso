/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';

import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import encryptPayload from '@utils/encryptPayload';
import classes from './style.module.scss';
import { selectRegisterError } from './selectors';
import { registerDriverRequest } from './actions';

const CreateDriver = ({ registerError }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: null,
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('email', encryptPayload(formData.email));
    formDataObj.append('password', encryptPayload(formData.password));
    formDataObj.append('fullName', encryptPayload(formData.fullName));
    formDataObj.append('phoneNumber', encryptPayload(formData.phoneNumber));
    formDataObj.append('image', file);

    dispatch(registerDriverRequest({ formDataObj }));
  };

  return (
    <div className={classes.registerContainer}>
      <div className={classes.card}>
        <div className={classes.title}>
          <FormattedMessage id="app_register_driver_title" />
        </div>
        <div className={classes.desc}>
          <FormattedMessage id="app_register_driver_desc" />
        </div>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            {registerError && <span className={classes.errorRegister}>{registerError}</span>}
            <div className={classes.fullName}>
              <label htmlFor="fullName">
                <FormattedMessage id="app_register_fullName" />
              </label>
              <input name="fullName" onChange={handleChange} type="text" placeholder="John Doe" />
            </div>
            <div className={classes.phoneNumber}>
              <label htmlFor="phoneNumber">
                <FormattedMessage id="app_register_phoneNumber" />
              </label>
              <input name="phoneNumber" onChange={handleChange} type="number" placeholder="081********" />
            </div>
            <div className={classes.email}>
              <label htmlFor="email">
                <FormattedMessage id="app_register_email" />
              </label>
              <input name="email" onChange={handleChange} type="email" placeholder="johndoe@gmail.com" />
            </div>
            <div className={classes.password}>
              <label htmlFor="password">
                <FormattedMessage id="app_register_password" />
              </label>
              <input name="password" onChange={handleChange} type="password" placeholder="***********" />
            </div>
            <div className={classes.image}>
              <label htmlFor="image">
                <FormattedMessage id="app_create_menu_image" />
              </label>
              <input name="image" onChange={handleFileChange} type="file" accept="image/png, image/jpeg" />
            </div>
            <div className={classes.loginButtonContainer}>
              <button type="submit">
                <FormattedMessage id="app_register_title" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  registerError: selectRegisterError,
});

CreateDriver.propTypes = {
  registerError: PropTypes.string,
};

export default connect(mapStateToProps)(CreateDriver);
