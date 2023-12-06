import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectLogin } from '@containers/Client/selectors';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { setLocale } from '@containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { selectLocale } from '@containers/App/selectors';
import classes from './style.module.scss';
import { registerRequest } from './actions';
import { selectRegisterError } from './selector';

const schema = yup.object().shape({
  fullName: yup.string().required(<FormattedMessage id="app_register_fullname_err" />),
  phoneNumber: yup.string().required(<FormattedMessage id="app_register_phonenumber_err" />),
  email: yup
    .string()
    .email(<FormattedMessage id="app_login_email_err" />)
    .required(<FormattedMessage id="app_login_email_req_err" />),
  password: yup
    .string()
    .min(6, <FormattedMessage id="app_login_password_err" />)
    .required(<FormattedMessage id="app_login_password_req_err" />),
});

const Register = ({ locale }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const isLoggedIn = useSelector(selectLogin);
  const registerError = useSelector(selectRegisterError);

  const open = Boolean(menuPosition);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    navigate('/');
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = (data) => {
    dispatch(registerRequest(data));
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  return (
    <div className={classes.registerContainer}>
      <div className={classes.left}>
        <div className={classes.title}>
          <FormattedMessage id="app_login_moto" />
        </div>
        <div className={classes.desc}>
          <div className={classes.descText}>
            <FormattedMessage id="app_login_moto_desc" />
          </div>
        </div>
      </div>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.btnBackCont} onClick={handleBack}>
            <ArrowBackIcon />
          </div>
          <div className={classes.langCont}>
            <div className={classes.toggle} onClick={handleClick}>
              <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
              <div className={classes.lang}>{locale}</div>
              <ExpandMoreIcon />
            </div>
            <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
              <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
                <div className={classes.menu}>
                  <Avatar className={classes.menuAvatar} src="/id.png" />
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_lang_id" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
                <div className={classes.menu}>
                  <Avatar className={classes.menuAvatar} src="/en.png" />
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_lang_en" />
                  </div>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className={classes.title}>
          <FormattedMessage id="app_register_title" />
        </div>
        <div className={classes.desc}>
          <FormattedMessage id="app_login_desc" />
        </div>
        <div className={classes.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {registerError && <span className={classes.errorRegister}>{registerError}</span>}
            <div className={classes.fullName}>
              <label htmlFor="fullName">
                <FormattedMessage id="app_register_fullName" />
              </label>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="text" placeholder="John Doe" />}
              />
              {errors.fullName && <span className={classes.error}>{errors.fullName.message}</span>}
            </div>
            <div className={classes.phoneNumber}>
              <label htmlFor="phoneNumber">
                <FormattedMessage id="app_register_phoneNumber" />
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="number" placeholder="081********" />}
              />
              {errors.phoneNumber && <span className={classes.error}>{errors.phoneNumber.message}</span>}
            </div>
            <div className={classes.email}>
              <label htmlFor="email">
                <FormattedMessage id="app_register_email" />
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="email" placeholder="johndoe@gmail.com" />}
              />
              {errors.email && <span className={classes.error}>{errors.email.message}</span>}
            </div>
            <div className={classes.password}>
              <label htmlFor="password">
                <FormattedMessage id="app_register_password" />
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="password" placeholder="***********" />}
              />
              {errors.password && <span className={classes.error}>{errors.password.message}</span>}
            </div>
            <div className={classes.loginButtonContainer}>
              <button type="submit">
                <FormattedMessage id="app_register_title" />
              </button>
            </div>
            <div className={classes.registerCont}>
              <div className={classes.registerTitle}>
                <FormattedMessage id="app_register_login_title" />
              </div>
              <a href="/login">
                <FormattedMessage id="app_register_login_button" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
});

Register.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Register);
