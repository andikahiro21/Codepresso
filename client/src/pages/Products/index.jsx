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
  const [search, setSearch] = useState('');
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
    dispatch(getAllProducts(currentPage, search, selectedCategory.id));
    dispatch(getCategories());
  }, [dispatch, currentPage, search, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className={classes.products}>
      <PopupOrder open={open} handleClose={handleClose} />
      <div className={classes.title}>
        <FormattedMessage id="app_products_title" />
      </div>
      <input
        type="text"
        placeholder="Search"
        className={classes.searchInput}
        onChange={(e) =>
          setTimeout(() => {
            setSearch(e.target.value);
          }, 1000)
        }
      />
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
        {products?.data?.map((product) => (
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
