/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import logoNav from '@static/images/logoNav.png';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { FaBars } from 'react-icons/fa';

import { setLocale } from '@containers/App/actions';
import { MdClose } from 'react-icons/md';

import { FormControl, InputLabel, ListItemIcon, Select } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { getAddress, setActiveAddress, setLogin, setToken } from '@containers/Client/actions';
import { selectAddress, selectLogin, selectToken } from '@containers/Client/selectors';
import PopupBaskets from '@components/PopupBaskets';
import PopupAddAddress from '@components/PopupAddAddress';
import PopupConfirmPayment from '@components/PopupConfirmPayment';
import PopupAddress from '@components/PopupAddress';
import { jwtDecode } from 'jwt-decode';
import classes from './style.module.scss';

const Navbar = ({ title, locale, login, token, address }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const [openHam, setOpenHam] = useState(false);
  const [openBaskets, setOpenBaskets] = useState(false);
  const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openAddAddress, setOpenAddAddress] = useState(false);

  const handleClickOpenBaskets = () => {
    setOpenBaskets(true);
  };

  const handleCloseBaskets = () => {
    setOpenBaskets(false);
  };

  const handleClickOpenPayment = () => {
    const hasActiveAddress = address.some((addr) => addr.active);

    if (hasActiveAddress) {
      setOpenBaskets(false);
      setOpenConfirmPayment(true);
    } else {
      alert('Active address not found! Please select or add an active address.');
    }
  };

  const handleClosepayment = () => {
    setOpenConfirmPayment(false);
  };

  const handleClickOpenAddress = () => {
    setOpenAddress(true);
  };

  const handleCloseAddress = () => {
    setOpenAddress(false);
  };
  const handleClickOpenAddAddress = () => {
    setOpenAddress(false);
    setOpenAddAddress(true);
  };

  const handleCloseAddAddress = () => {
    setOpenAddAddress(false);
  };

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

  const handleActiveChange = (event) => {
    const selectedAddressId = event.target.value;
    dispatch(setActiveAddress(selectedAddressId));
  };
  const goHome = () => {
    navigate('/');
  };

  let decoded = null;
  if (token) {
    decoded = jwtDecode(token);
  }

  useEffect(() => {
    if (token && decoded && decoded?.data?.role === 2) {
      dispatch(getAddress());
    }
  }, [dispatch, token]);
  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <PopupBaskets
        open={openBaskets}
        handleClose={handleCloseBaskets}
        handleClickOpenPayment={handleClickOpenPayment}
      />
      <PopupAddAddress open={openAddAddress} handleClose={handleCloseAddAddress} />
      <PopupAddress open={openAddress} handleClose={handleCloseAddress} handleOpenCreate={handleClickOpenAddAddress} />
      <PopupConfirmPayment open={openConfirmPayment} handleClose={handleClosepayment} />
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
            <a href="/products" onClick={handleCloseHam}>
              <li>
                <FormattedMessage id="app_nav_menu" />
              </li>
            </a>
            <a href="/order-history" onClick={handleCloseHam}>
              <li>
                <FormattedMessage id="app_nav_history" />
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
            <a href="/">
              <li>
                <FormattedMessage id="app_nav_home" />
              </li>
            </a>
            <a href="/products">
              <li>
                <FormattedMessage id="app_nav_menu" />
              </li>
            </a>

            {decoded?.data?.role === 2 && (
              <a href="/order-history">
                <li>
                  <FormattedMessage id="app_nav_history" />
                </li>
              </a>
            )}
            {decoded?.data?.role === 1 && (
              <>
                <a href="/create-menu">
                  <li>
                    <FormattedMessage id="app_nav_create_menu" />
                  </li>
                </a>
                <a href="/create-driver">
                  <li>
                    <FormattedMessage id="app_nav_create_driver" />
                  </li>
                </a>
                <a href="/manage-order">
                  <li>
                    <FormattedMessage id="app_nav_manage_order" />
                  </li>
                </a>
              </>
            )}
          </ul>
        </div>
        <div className={classes.toolbar}>
          {login && decoded ? (
            <>
              {login && decoded?.data?.role === 2 && (
                <div className={classes.cartContainer} onClick={handleClickOpenBaskets}>
                  <ShoppingCartIcon />
                </div>
              )}

              <img src={decoded.data.image} className={classes.profileIcon} alt="icon" onClick={handleClickProfile} />
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
                {login && decoded?.data?.role === 2 && (
                  <>
                    <MenuItem>
                      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="active-address-label">
                          <FormattedMessage id="app_nav_active_address" />
                        </InputLabel>
                        <Select
                          labelId="active-address-label"
                          id="active-address"
                          value={address?.find((a) => a?.active)?.id || ''}
                          onChange={handleActiveChange}
                          className={classes.selectAddress}
                          label={<FormattedMessage id="app_nav_active_address" />}
                        >
                          {address?.map((addr) => (
                            <MenuItem className={classes.addressName} key={addr.id} value={addr.id}>
                              {addr.address_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </MenuItem>
                    <MenuItem onClick={handleClickOpenAddress}>
                      <div className={classes.addressTitle}>Manage Address</div>
                    </MenuItem>
                  </>
                )}
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
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>

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
