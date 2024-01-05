import React from 'react';
import PropTypes from 'prop-types';

import formatCurrency from '@utils/formatCurrency';

import ButtonPrint from '@pages/DetailOrder/components/ButtonPrint';
import classes from './style.module.scss';

const ContentPrint = React.forwardRef(({ orderHistory, totalPrice }, ref) => {
  const formatOrderDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedDate = new Date(orderHistory?.date).toLocaleDateString('en-US', options);
    return formattedDate;
  };
  return (
    <div className={classes.receipt} ref={ref}>
      <div className={classes.wrapperHead}>
        <div className={classes.headTitle}>Receipt</div>
        <ButtonPrint contentRef={ref} />
      </div>
      <div className={classes.subHeadTitle} data-testid="ReceiptTitle">
        {orderHistory?.status}
      </div>
      <div className={classes.date}>{formatOrderDate()}</div>
      <div className={classes.contents}>
        <div className={classes.box}>
          <div className={classes.subTitle}>Order ID</div>
          <div className={classes.subDesc}>{orderHistory?.id}</div>
        </div>
        <div className={classes.box}>
          <div className={classes.subTitle}>Driver Name</div>
          <div className={classes.subDesc}>{orderHistory?.user_driver}</div>
        </div>
        <div className={classes.box}>
          <div className={classes.subTitle}>Customer Name</div>
          <div className={classes.subDesc}>{orderHistory?.user_receiver?.full_name}</div>
        </div>
        <div className={classes.box}>
          <div className={classes.subTitle}>Notes</div>
          <div className={classes.subDesc}>{orderHistory?.note}</div>
        </div>
      </div>
      <div className={classes.subHeadTitle}>Items</div>
      <div className={classes.contents}>
        {orderHistory?.purchaseGroup_purchase?.map((val) => (
          <div key={val?.id} className={classes.box}>
            <div className={classes.subTitle}>{val?.menu_purchase?.name}</div>
            <div className={classes.subDesc}>{val?.menu_purchase?.type}</div>
            <div className={classes.subDesc}>{formatCurrency(val?.menu_purchase?.price)}</div>
            <div className={classes.subDesc}>{val?.menu_purchase?.qty} item</div>
          </div>
        ))}
      </div>
      <div className={classes.grossAmount}>
        <div className={classes.grossAmountTitle}>Total</div>
        <div>{formatCurrency(totalPrice)}</div>
      </div>
    </div>
  );
});

ContentPrint.propTypes = {
  orderHistory: PropTypes.object,
  totalPrice: PropTypes.number,
};

export default ContentPrint;
