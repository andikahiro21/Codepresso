import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

import logoNav from '@static/images/logoNav.png';

import classes from './style.module.scss';

const Footer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className={classes.footer}>
      <div className={classes.company}>
        <img src={logoNav} alt="logo" className={classes.logo} />
        <div className={classes.title}>
          <FormattedMessage id="app_title_header" />
        </div>
      </div>
      <div className={classes.navFooter}>
        <div className={classes.mission}>
          <div className={classes.title}>Our Mission</div>
          <div className={classes.desc}>
            At our company, we strive to make your coffee time more enjoyable. Since 2020, we have been providing
            high-quality coffee and excellent service.
          </div>
          <div className={classes.socCont}>
            <div className={classes.icon}>
              <InstagramIcon />
            </div>
            <div className={classes.icon}>
              <FacebookIcon />
            </div>
            <div className={classes.icon}>
              <YouTubeIcon />
            </div>
          </div>
          <div className={classes.copyright}>2022 © Vinicius Okamoto</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
