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

import { selectLocale } from '@containers/App/selectors';

import { setLocale } from '@containers/App/actions';

import { createStructuredSelector } from 'reselect';
import { forgotRequest } from './actions';
import { selectForgotError } from './selectors';

import classes from './style.module.scss';

const schema = yup.object().shape({
  email: yup
    .string()
    .email(<FormattedMessage id="app_login_email_err" />)
    .required(<FormattedMessage id="app_login_email_req_err" />),
});

const ForgotPassword = ({ locale }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const isLoggedIn = useSelector(selectLogin);
  const forgotError = useSelector(selectForgotError);

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
    dispatch(forgotRequest(data));
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
    <div className={classes.forgotContainer}>
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
          <FormattedMessage id="app_forgot_title" />
        </div>
        <div className={classes.desc}>
          <FormattedMessage id="app_login_desc" />
        </div>
        <div className={classes.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {forgotError && <span className={classes.errorForgot}>{forgotError}</span>}
            <div className={classes.email}>
              <label htmlFor="email">
                <FormattedMessage id="app_login_email" />
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="text" placeholder="johndoe@gmail.com" />}
              />
              {errors.email && <span className={classes.error}>{errors.email.message}</span>}
            </div>
            <div className={classes.loginButtonContainer}>
              <button type="submit">
                <FormattedMessage id="app_forgot_button" />
              </button>
            </div>
            <div className={classes.registerCont}>
              <div className={classes.registerTitle}>
                <FormattedMessage id="app_login_register_title" />
              </div>
              <a href="/register">
                <FormattedMessage id="app_login_register_button" />
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

ForgotPassword.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ForgotPassword);
