import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import aboutImg from '@static/images/about-img.png';
import classes from './style.module.scss';

const AboutUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className={classes.aboutUs}>
      <div className={classes.title}>
        <FormattedMessage id="app_nav_about" />
      </div>
      <div className={classes.description}>
        <div className={classes.left}>
          <div className={classes.moto}>
            <FormattedMessage id="app_about_title" />
          </div>
          <div className={classes.desc}>
            <FormattedMessage id="app_about_desc" />
          </div>
          <button type="button">
            <FormattedMessage id="app_about_btn" />
          </button>
        </div>

        <div className={classes.right}>
          <img src={aboutImg} alt="" />
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
