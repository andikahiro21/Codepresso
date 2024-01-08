import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import Macchiato from '@static/images/macchiato.png';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { getAllOrder } from './actions';
import { selectAllOrder } from './selectors';
import classes from './style.module.scss';
import ChatDialog from '@components/ChatDialog';

const OrderHistory = ({ allOrder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemChat, setItemChat] = useState(false);
  const [chatDialog, setChatDialog] = useState(false);

  const handleOpenChat = (item) => {
    setItemChat(item);
    setChatDialog(true);
  };

  const handleCloseChat = () => {
    setChatDialog(false);
  };

  const calculateTotalPrice = (items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    return `Rp ${totalPrice.toLocaleString()}`;
  };
  const calculateTotalItems = (items) => {
    const totalItem = items.reduce((acc, item) => acc + item.qty, 0);
    return `${totalItem.toLocaleString()} Items`;
  };
  const convertToDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleClick = (e, id) => {
    e.stopPropagation();
    navigate(`/detail-order/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log(allOrder?.data?.selectedPurchase);

  useEffect(() => {
    dispatch(getAllOrder(currentPage));
  }, [dispatch, currentPage]);
  return (
    <div className={classes.orderHistory}>
      <ChatDialog open={chatDialog} onClose={handleCloseChat} items={itemChat} />

      <div className={classes.orderTitle}>
        <FormattedMessage id="app_order_history_title" />
      </div>
      <div className={classes.orderCont}>
        {allOrder?.data?.selectedPurchase?.map((item) => (
          <div className={classes.order} onClick={() => handleClick(item?.id)} key={item?.id}>
            <div className={classes.left}>
              <div className={classes.imgContainer}>
                <img src={Macchiato} alt="product" />
              </div>
              <div className={classes.statusCont}>
                <div className={classes.date}>{convertToDate(item?.date)}</div>
                <div className={classes.status}>{item?.status}</div>
              </div>
            </div>
            <div className={classes.right}>
              {item?.status === 'On-Delivery' && (
                <div className={classes.chat}>
                  <button type="button" onClick={() => handleOpenChat(item)}>
                    Chat
                  </button>
                </div>
              )}

              <div className={classes.priceContainer}>
                <div className={classes.priceTotal}> {calculateTotalPrice(item?.purchaseGroup_purchase)}</div>
                <div className={classes.itemsCount}>{calculateTotalItems(item?.purchaseGroup_purchase)}</div>
              </div>
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

OrderHistory.propTypes = {
  allOrder: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  allOrder: selectAllOrder,
});

export default connect(mapStateToProps)(OrderHistory);
