import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import ProductCard from '@components/ProductCard';

import { getAllProducts, getCategories, getSelectedProducts } from './actions';
import { selectCategories, selectProducts } from './selectors';
import PopupOrder from './PopupOrder';

import classes from './style.module.scss';

const Products = ({ products, categories }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    dispatch(getSelectedProducts(id));
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getAllProducts(currentPage));
    dispatch(getCategories());
  }, [dispatch, currentPage]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? products?.data
      : products?.data?.filter((product) => product.category_id === selectedCategory.id);
  return (
    <div className={classes.products}>
      <PopupOrder open={open} handleClose={handleClose} />
      <div className={classes.title}>
        <FormattedMessage id="app_products_title" />
      </div>
      <div className={classes.category}>
        <div
          className={`${selectedCategory === 'All' ? classes.active : classes.categoryName}`}
          onClick={() => handleCategoryClick('All')}
        >
          All
        </div>
        {categories?.map((category) => (
          <div
            onClick={() => handleCategoryClick(category)}
            className={`${selectedCategory === category ? classes.active : classes.categoryName}`}
            key={category.id}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className={classes.content}>
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product?.id}
            name={product?.name}
            price={product?.price}
            description={product?.description}
            image={product?.image}
            qty={product?.qty}
            id={product?.id}
            handleClick={handleClickOpen}
          />
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
const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  categories: selectCategories,
});

Products.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
};

export default connect(mapStateToProps)(Products);
