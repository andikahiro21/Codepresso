import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import ProductCard from '@components/ProductCard';
import classes from './style.module.scss';

const ManageProducts = ({ products, currentPage, handlePageChange, handleClickOpen }) => {
  if (isEmpty(products)) {
    return (
      <div className={classes.products}>
        <div className={classes.title}>
          <FormattedMessage id="app_no_data" />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.products}>
      <div className={classes.content}>
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} handleClick={handleClickOpen} currentPage={currentPage} />
        ))}
      </div>
      <div className={classes.pagination}>
        {Array.from({ length: products?.totalPage }, (_, index) => index + 1).map((page) => (
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
  );
};

ManageProducts.propTypes = {
  products: PropTypes.array,
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func,
  handleClickOpen: PropTypes.func,
};

export default ManageProducts;
