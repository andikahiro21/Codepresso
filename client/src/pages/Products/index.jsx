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
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    dispatch(getSelectedProducts(id));
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === 'All' ? products : products.filter((product) => product.category_id === selectedCategory.id);
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
            id={product?.id}
            handleClick={handleClickOpen}
          />
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
