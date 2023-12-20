/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { selectCategories, selectSelectedProducts } from '@pages/Products/selectors';
import { getCategories, getSelectedProducts } from '@pages/Products/actions';
import { selectEditMenuError } from './selectors';
import classes from './style.module.scss';
import { editMenu } from './actions';

const EditMenu = ({ categories, editError, selectedProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    categoryID: selectedProduct?.data?.category_id || 1,
    description: '',
    type: '',
    price: '',
    sizes: false,
    beans: false,
    milk: false,
    sugars: false,
  });

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  if (selectedProduct?.data === null) {
    navigate('/products');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('category_id', formData.categoryID);
    formDataObj.append('description', formData.description);
    formDataObj.append('type', formData.type);
    formDataObj.append('price', formData.price);
    formDataObj.append('sizes', formData.sizes);
    formDataObj.append('beans', formData.beans);
    formDataObj.append('milk', formData.milk);
    formDataObj.append('sugars', formData.sugars);
    formDataObj.append('image', file);
    dispatch(editMenu({ formDataObj, id }));
  };
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSelectedProducts(id));
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct?.data) {
      setFormData({
        name: selectedProduct?.data?.name,
        categoryID: selectedProduct?.data?.category_id,
        description: selectedProduct?.data?.description,
        type: selectedProduct?.data?.type,
        price: selectedProduct?.data?.price,
        sizes: selectedProduct.data.size.length > 0,
        beans: selectedProduct.data.bean.length > 0,
        milk: selectedProduct.data.milk.length > 0,
        sugars: selectedProduct.data.sugar_level.length > 0,
      });
    }
  }, [selectedProduct]);

  console.log(selectedProduct);
  return (
    <div className={classes.createMenu}>
      <div className={classes.createTitle}>Create Menu </div>
      <div className={classes.form}>
        <form onSubmit={handleSubmit}>
          {editError && <span className={classes.errorCreate}>{editError}</span>}
          <div className={classes.name}>
            <label htmlFor="name">
              <FormattedMessage id="app_create_menu_name" />
            </label>
            <input name="name" type="text" placeholder="Cappucino" value={formData.name} onChange={handleChange} />
          </div>
          <div className={classes.category}>
            <label htmlFor="category">
              <FormattedMessage id="app_create_menu_category" />
            </label>
            <select name="categoryID" id="categoryID" onChange={handleChange} value={formData.categoryID}>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className={classes.description}>
            <label htmlFor="description">
              <FormattedMessage id="app_create_menu_description" />
            </label>
            <textarea
              name="description"
              rows="4"
              cols="50"
              value={formData.description}
              placeholder="Cappucino is coffee..."
              onChange={handleChange}
            />
          </div>
          <div className={classes.type}>
            <label htmlFor="type">
              <FormattedMessage id="app_create_menu_type" />
            </label>
            <select name="type" id="type" onChange={handleChange} value={formData.type}>
              <option value="Beverage">Beverage</option>
              <option value="Food">Food</option>
            </select>
          </div>
          <div className={classes.image}>
            <label htmlFor="image">
              <FormattedMessage id="app_create_menu_image" />
            </label>
            <input name="image" onChange={handleFileChange} type="file" accept="image/png, image/jpeg" />
          </div>
          <div className={classes.price}>
            <label htmlFor="price">
              <FormattedMessage id="app_create_menu_price" />
            </label>
            <input name="price" type="number" placeholder="28000" value={formData.price} onChange={handleChange} />
          </div>
          <div className={classes.addOnsContainer}>
            <div className={classes.addOns}>
              <input
                type="checkbox"
                onChange={handleChange}
                id="sizes"
                name="sizes"
                value="true"
                {...(formData.sizes ? { checked: true } : {})}
              />
              <label htmlFor="sizes">
                <FormattedMessage id="app_create_menu_sizes" />
              </label>
            </div>
            <div className={classes.addOns}>
              <input
                type="checkbox"
                onChange={handleChange}
                id="beans"
                name="beans"
                value="true"
                {...(formData.beans ? { checked: true } : {})}
              />
              <label htmlFor="beans">
                <FormattedMessage id="app_create_menu_beans" />
              </label>
            </div>
            <div className={classes.addOns}>
              <input
                type="checkbox"
                onChange={handleChange}
                id="milk"
                name="milk"
                value="true"
                {...(formData.milk ? { checked: true } : {})}
              />
              <label htmlFor="milk">
                <FormattedMessage id="app_create_menu_milk" />
              </label>
            </div>
            <div className={classes.addOns}>
              <input
                type="checkbox"
                onChange={handleChange}
                id="sugars"
                name="sugars"
                value="true"
                {...(formData.sugars ? { checked: true } : {})}
              />
              <label htmlFor="sugars">
                <FormattedMessage id="app_create_menu_sugars" />
              </label>
            </div>
          </div>

          <div className={classes.createMenuButtonContainer}>
            <button type="submit">
              <FormattedMessage id="app_create_menu_button" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  editError: PropTypes.string,
  selectedProduct: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  categories: selectCategories,
  editError: selectEditMenuError,
  selectedProduct: selectSelectedProducts,
});

export default connect(mapStateToProps)(EditMenu);
