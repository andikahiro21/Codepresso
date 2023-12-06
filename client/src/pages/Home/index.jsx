import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import AboutUs from './component/aboutus';

import classes from './style.module.scss';
import Service from './component/service';

const Home = () => (
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
const mapStateToProps = createStructuredSelector({});

Home.propTypes = {};

export default connect(mapStateToProps)(Home);
