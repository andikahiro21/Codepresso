import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import decryptToken from '@utils/decryptToken';
import { selectToken } from '@containers/Client/selectors';
import {
  getAllProducts,
  getCategories,
  getSelectedProducts,
  getSoftDeletedMenu,
  restoreSoftDeleteMenu,
} from './actions';
import { selectCategories, selectProducts, selectSoftDeletedProducts } from './selectors';

import ManageProducts from './components/ManageProducts';
import DeleteHistory from './components/DeletedHistory';
import PopupOrder from './PopupOrder';
import classes from './style.module.scss';

const Products = ({ products, categories, token, productsDeleted }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const decode = token ? decryptToken(token) : null;
  const isAdmin = decode?.data?.role === 1;

  useEffect(() => {
    dispatch(getAllProducts(currentPage));
    dispatch(getCategories());
    if (isAdmin) {
      dispatch(getSoftDeletedMenu());
    }
  }, [dispatch, currentPage]);

  const handleClickOpen = (id) => {
    setOpen(true);
    dispatch(getSelectedProducts(id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRestoreMenu = (id) => {
    dispatch(
      restoreSoftDeleteMenu(id, () => {
        dispatch(getAllProducts(currentPage));
        dispatch(getSoftDeletedMenu());
      })
    );
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
        {isAdmin && (
          <div
            className={`${selectedCategory === 'HistoryDeleted' ? classes.active : classes.categoryName}`}
            onClick={() => handleCategoryClick('HistoryDeleted')}
          >
            History Menu Deleted
          </div>
        )}
      </div>
      {selectedCategory === 'HistoryDeleted' && isAdmin ? (
        <DeleteHistory products={productsDeleted} handleRestore={handleRestoreMenu} />
      ) : (
        <ManageProducts
          products={filteredProducts}
          categories={categories}
          currentPage={currentPage}
          handleClose={handleClose}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
          handlePageChange={handlePageChange}
          handleClickOpen={handleClickOpen}
          open={open}
        />
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  products: selectProducts,
  categories: selectCategories,
  token: selectToken,
  productsDeleted: selectSoftDeletedProducts,
});

Products.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  token: PropTypes.string,
  productsDeleted: PropTypes.array,
};

export default connect(mapStateToProps)(Products);
