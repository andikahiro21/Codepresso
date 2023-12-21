import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';

import PopupListOrder from '@components/PopupListOrder';
import PopupDriverList from '@components/PopupDriverList';

import { selectAllOrderAdmin } from './selectors';
import { getAllOrderAdmin } from './actions';

import classes from './style.module.scss';

const ManageOrder = ({ allOrder }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [listPurchase, setListPurchase] = useState([]);
  const [driverOrder, setDriverOrder] = useState([]);
  const [openListOrder, setOpenListOrder] = useState(false);
  const [openListDriver, setOpenListDriver] = useState(false);

  const handleCloseList = () => {
    setOpenListOrder(false);
  };

  const handleCloseDriverList = () => {
    setOpenListDriver(false);
  };

  const handleClick = (id) => {
    const selectedPurchase = allOrder?.data?.selectedPurchase?.find((item) => item.id === id);

    if (selectedPurchase) {
      setListPurchase(selectedPurchase.purchaseGroup_purchase);
    }
    setOpenListOrder(true);
  };

  const handleButton = (id, event) => {
    event.stopPropagation();

    const selectedPurchase = allOrder?.data?.selectedPurchase?.find((item) => item.id === id);

    if (selectedPurchase) {
      setDriverOrder(selectedPurchase);
    }
    setOpenListDriver(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllOrderAdmin(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className={classes.orderHistory}>
      <PopupListOrder open={openListOrder} handleClose={handleCloseList} items={listPurchase} />
      <PopupDriverList open={openListDriver} handleClose={handleCloseDriverList} items={driverOrder} />
      <div className={classes.orderTitle}>
        <FormattedMessage id="app_manage_order_title" />
      </div>
      <div className={classes.orderCont}>
        {allOrder?.data?.selectedPurchase?.map((item) => (
          <div className={classes.order} key={item?.id}>
            <div className={classes.left}>
              <div className={classes.imgContainer}>
                <img src={item?.purchaseGroup_purchase[0]?.menu_purchase?.image} alt="product" />
              </div>
              <div className={classes.statusCont}>
                <div className={classes.reveiverName}>
                  {item?.user_receiver?.full_name}
                  {item.id}
                </div>
                <div className={classes.note}>{item?.note}</div>
              </div>
            </div>
            <div className={classes.buttonContainer}>
              <button type="button" onClick={() => handleClick(item?.id)}>
                <FormattedMessage id="app_manage_order_list_button" />
              </button>
              {item.status === 'Order Finished' && (
                <div className={classes.orderFinished}>
                  <FormattedMessage id="app_manage_order_finished" />
                </div>
              )}
              {item.status === 'On-Delivery' && (
                <div className={classes.orderDelivery}>
                  <FormattedMessage id="app_manage_order_delivery" />
                </div>
              )}
              {item.status !== 'Order Finished' && item.status !== 'On-Delivery' && (
                <button type="button" onClick={(event) => handleButton(item.id, event)}>
                  <FormattedMessage id="app_manage_order_button" />
                </button>
              )}
            </div>
          </div>
        ))}
        <div className={classes.pagination}>
          {Array.from({ length: allOrder?.data?.totalPage }, (_, index) => index + 1).map((page) => (
            <span
              key={page}
              className={page === currentPage ? classes.currentPage : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </span>
          ))}
        </div>
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
