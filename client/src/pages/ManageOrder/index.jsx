import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import Macchiato from '@static/images/macchiato.png';
import { useNavigate } from 'react-router-dom';

import classes from './style.module.scss';
import { selectAllOrderAdmin } from './selectors';
import { getAllOrderAdmin } from './actions';

const ManageOrder = ({ allOrder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrderAdmin(currentPage));
  }, [dispatch, currentPage]);
  console.log(allOrder);
  return (
    <div className={classes.orderHistory}>
      <div className={classes.orderTitle}>Order History</div>
      <div className={classes.orderCont}>
        <div className={classes.order}>
          <div className={classes.left}>
            <div className={classes.imgContainer}>
              <img src={Macchiato} alt="product" />
            </div>
            <div className={classes.statusCont}>
              <div className={classes.date}>2023-10-01</div>
              <div className={classes.status}>Order Receive</div>
            </div>
          </div>
          <div className={classes.priceContainer}>
            <div className={classes.priceTotal}>Rp 820000</div>
            <div className={classes.itemsCount}>11 Items</div>
          </div>
        </div>
        {/* <div className={classes.pagination}>
          {Array.from({ length: allOrder?.data?.totalPage }, (_, index) => index + 1).map((page) => (
            <span
              key={page}
              className={page === currentPage ? classes.currentPage : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </span>
          ))}
        </div> */}
      </div>
    </div>
  );
};

ManageOrder.propTypes = {
  allOrder: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  allOrder: selectAllOrderAdmin,
});

export default connect(mapStateToProps)(ManageOrder);
