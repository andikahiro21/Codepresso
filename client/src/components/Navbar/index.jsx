/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import logoNav from '@static/images/logoNav.png';
import ProfileIcon from '@static/images/profile.svg';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FaBars } from 'react-icons/fa';

import { setLocale } from '@containers/App/actions';
import { MdClose } from 'react-icons/md';

import { FormControl, InputLabel, ListItemIcon, Select } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { setLogin, setToken } from '@containers/Client/actions';
import { selectAddress, selectLogin, selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';
import classes from './style.module.scss';

const Navbar = ({ title, locale, login, token, address }) => {
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

  const [anchorEl, setAnchorEl] = useState(null);
  const opened = Boolean(anchorEl);
  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
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

  const handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(setToken(null));
    window.location.href = '/login';
  };

  const goHome = () => {
    navigate('/');
  };

  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }

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
            <a href="/products">
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
          {login && decoded ? (
            <>
              {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
              <img src={ProfileIcon} className={classes.profileIcon} alt="icon" onClick={handleClickProfile} />
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={opened}
                onClose={handleCloseProfile}
                onClick={handleCloseProfile}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <button className={classes.btnLogin} type="button" onClick={handleClickLogin}>
              <FormattedMessage id="app_nav_login" />
            </button>
          )}
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

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
  address: selectAddress,
});

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  login: PropTypes.bool,
  token: PropTypes.string,
  address: PropTypes.array,
};

export default connect(mapStateToProps)(Navbar);
