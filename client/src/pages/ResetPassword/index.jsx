/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectLogin } from '@containers/Client/selectors';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { selectLocale } from '@containers/App/selectors';

import { setLocale } from '@containers/App/actions';

import { createStructuredSelector } from 'reselect';
import { resetRequest } from './actions';
import { selectResetError } from './selectors';

import classes from './style.module.scss';

const schema = yup.object().shape({
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const ResetPassword = ({ locale }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const isLoggedIn = useSelector(selectLogin);
  const resetError = useSelector(selectResetError);
  const { token } = useParams();

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
    dispatch(resetRequest(token, data));
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
    <div className={classes.resetContainer}>
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
          <FormattedMessage id="app_reset_title" />
        </div>
        <div className={classes.desc}>
          <FormattedMessage id="app_login_desc" />
        </div>
        <div className={classes.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {resetError && <span className={classes.errorReset}>{resetError}</span>}
            <div className={classes.password}>
              <label htmlFor="newPassword">
                <FormattedMessage id="app_reset_password" />
              </label>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="password" placeholder="***********" />}
              />
              {errors.newPassword && <span className={classes.error}>{errors.newPassword.message}</span>}
            </div>
            <div className={classes.password}>
              <label htmlFor="confirmPassword">
                <FormattedMessage id="app_reset_confirm_password" />
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} type="password" placeholder="***********" />}
              />
              {errors.confirmPassword && <span className={classes.error}>{errors.confirmPassword.message}</span>}
            </div>
            <div className={classes.loginButtonContainer}>
              <button type="submit">
                <FormattedMessage id="app_forgot_button" />
              </button>
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

ResetPassword.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ResetPassword);
