import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';

import AboutUs from './component/aboutus';
import Service from './component/service';
import { getAddress } from './actions';

import classes from './style.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);
  return (
    <div className={classes.home}>
      <div className={classes.titleCont}>
        <div className={classes.title}>
          <p>
            Craving the perfect cup of coffee? Our blends are <span>lovely and delicious.</span>
          </p>
        </div>
        <div className={classes.desc}>
          <FormattedMessage id="app_home_desc" />
        </div>
      </div>
      <AboutUs />
      <Service />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({});

Home.propTypes = {};

export default connect(mapStateToProps)(Home);
