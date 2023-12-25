/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable arrow-body-style */
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { addCategory, deleteCategory, getCategories } from '@pages/Products/actions';
import { selectCategories } from '@pages/Products/selectors';
import classes from './style.module.scss';

const PopupManageCategories = ({ open, handleClose, categories }) => {
  const dispatch = useDispatch();
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleAddCategory = () => {
    const data = {
      name: newCategoryName,
    };
    if (newCategoryName.trim() !== '') {
      dispatch(addCategory(data));
      setNewCategoryName('');
    }
  };
  return (
    <Dialog
      className={classes.popupOrder}
      open={open}
      fullWidth="xl"
      maxWidth="sm"
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={classes.cardContainer}>
        <div className={classes.cardTitle}>
          <FormattedMessage id="app_nav_manage_categories" />
        </div>
        <div className={classes.inputCategory}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Signature Coffee"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button type="button" onClick={handleAddCategory}>
            <FormattedMessage id="app_manage_cateogries_button" />
          </button>
        </div>

        <div className={classes.categoryCont}>
          {categories?.map((category) => (
            <div className={classes.category}>
              <div className={classes.categoryName}>{category?.name}</div>
              <div
                className={classes.action}
                onClick={() => {
                  handleDelete(category.id);
                }}
              >
                <DeleteIcon className={classes.deleteIcon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

PopupManageCategories.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  categories: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
});

export default connect(mapStateToProps)(PopupManageCategories);
