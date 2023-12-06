import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import logoNav from '@static/images/logoNav.png';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FaBars } from 'react-icons/fa';

import { setLocale } from '@containers/App/actions';
import { MdClose } from 'react-icons/md';

import classes from './style.module.scss';

const Navbar = ({ title, locale }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const [openHam, setOpenHam] = useState(false);

  const open = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleOpenHam = () => {
    setOpenHam(true);
  };

  const handleCloseHam = () => {
    setOpenHam(false);
  };
  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      {openHam && (
        <div className={classes.popUpCard}>
          <div className={classes.closeButton} onClick={handleCloseHam}>
            <MdClose size="2rem" />
          </div>
          <ul>
            <a href="/" onClick={handleCloseHam}>
              <li>
                <FormattedMessage id="app_nav_home" />
              </li>
            </a>
            <a href="#" onClick={handleCloseHam}>
              <li>
                <FormattedMessage id="app_nav_menu" />
              </li>
            </a>
            <a href="#" onClick={handleCloseHam}>
              <li>
                <FormattedMessage id="app_nav_about" />
              </li>
            </a>
            <a href="#" onClick={handleCloseHam}>
              <li>
                <FormattedMessage id="app_nav_service" />
              </li>
            </a>
            <a href="/login" onClick={handleCloseHam}>
              <li>
                <FormattedMessage id="app_nav_login" />
              </li>
            </a>
          </ul>
        </div>
      )}
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src={logoNav} alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>

        <div className={classes.menuList}>
          <ul>
            <a href="#">
              <li>
                <FormattedMessage id="app_nav_home" />
              </li>
            </a>
            <a href="#">
              <li>
                <FormattedMessage id="app_nav_about" />
              </li>
            </a>
            <a href="#">
              <li>
                <FormattedMessage id="app_nav_menu" />
              </li>
            </a>
            <a href="#">
              <li>
                <FormattedMessage id="app_nav_service" />
              </li>
            </a>
          </ul>
        </div>
        <div className={classes.toolbar}>
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
          <button className={classes.btnLogin} type="button" onClick={handleClickLogin}>
            <FormattedMessage id="app_nav_login" />
          </button>
          <div className={classes.hamburgerMenu}>
            <div onClick={handleOpenHam}>
              <FaBars size="1.3rem" />
            </div>
          </div>
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
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
};

export default Navbar;
