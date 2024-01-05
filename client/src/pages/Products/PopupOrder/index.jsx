import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';

import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react';

import { getAssetImages } from '@utils/assetHelper';

import { selectSelectedProducts } from '../selectors';
import { setBasket } from '../actions';

import classes from './style.module.scss';

const PopupOrder = ({ open, handleClose, product }) => {
  const dispatch = useDispatch();
  const [activeSizeId, setActiveSizeId] = useState('');
  const [activeBeanId, setActiveBeanId] = useState('');
  const [activeSugarId, setActiveSugarId] = useState('');
  const [activeMilkId, setActiveMilkId] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveSizeId(product?.data?.size?.[0]?.id || null);
    setActiveBeanId(product?.data?.bean?.[0]?.id || null);
    setActiveSugarId(product?.data?.sugar_level?.[0]?.id || null);
    setActiveMilkId(product?.data?.milk?.[0]?.id || null);
  }, [product]);
  const renderSizes = () => {
    if (product?.data?.size && product.data.size.length > 0) {
      return (
        <div className={classes.sizeContainer}>
          <div className={classes.title}>Sizes</div>
          <div className={classes.cardContainer}>
            {product.data.size.map((sizeData) => (
              <div
                className={`${classes.cardSize} ${sizeData.id === activeSizeId ? classes.cardSizeActive : ''}`}
                key={sizeData.id}
                onClick={() => setActiveSizeId(sizeData.id)}
              >
                <img src={getAssetImages('size', '/src/static/images/size.png')} alt="logo" />
                <div className={classes.sizeTitle}>{sizeData.name}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const calculateTotalPrice = () => {
    const productPrice = product?.data?.price;
    const sizePrice = product?.data?.size.find((sizeData) => sizeData.id === activeSizeId)?.price || 0;
    const beanPrice = product?.data?.bean.find((beanData) => beanData.id === activeBeanId)?.price || 0;
    const sugarPrice =
      product?.data?.sugar_level.find((sugarLevelData) => sugarLevelData.id === activeSugarId)?.price || 0;
    const milkPrice = product?.data?.milk.find((milkData) => milkData.id === activeMilkId)?.price || 0;

    const totalPrice = (productPrice + sizePrice + beanPrice + sugarPrice + milkPrice) * quantity;

    return totalPrice;
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const renderBeans = () => {
    if (product?.data?.bean && product.data.bean.length > 0) {
      return (
        <div className={classes.beanContainer}>
          <div className={classes.beanTitle}>Beans</div>
          <div className={classes.cardBeanContainer}>
            {product.data.bean.map((beanData) => (
              <div
                className={`${classes.bean} ${beanData.id === activeBeanId ? classes.beanActive : ''}`}
                key={beanData.id}
                onClick={() => setActiveBeanId(beanData.id)}
              >
                {beanData.name}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderSugarLevels = () => {
    if (product?.data?.sugar_level && product.data.sugar_level.length > 0) {
      return (
        <div className={classes.sugarContainer}>
          <div className={classes.sugarTitle}>Sugars</div>
          <div className={classes.cardSugarContainer}>
            {product.data.sugar_level.map((sugarLevelData) => (
              <div
                className={`${classes.sugar} ${sugarLevelData.id === activeSugarId ? classes.sugarActive : ''}`}
                key={sugarLevelData.id}
                onClick={() => setActiveSugarId(sugarLevelData.id)}
              >
                {sugarLevelData.name}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderMilk = () => {
    if (product?.data?.milk && product.data.milk.length > 0) {
      return (
        <div className={classes.milkContainer}>
          <div className={classes.milkTitle}>Milk</div>
          <div className={classes.cardMilkContainer}>
            {product.data.milk.map((milkData) => (
              <div
                className={`${classes.milk} ${milkData.id === activeMilkId ? classes.milkActive : ''}`}
                key={milkData.id}
                onClick={() => setActiveMilkId(milkData.id)}
              >
                {milkData.name}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  const handleAddToCart = () => {
    const formData = new FormData();
    formData.append('menu_id', product?.data?.id);
    formData.append('qty', quantity);
    formData.append('size_id', activeSizeId || '');
    formData.append('milk_id', activeMilkId || '');
    formData.append('sugar_id', activeSugarId || '');
    formData.append('bean_id', activeBeanId || '');

    dispatch(setBasket(formData));
    handleClose();
  };
  return (
    <Dialog
      className={classes.popupOrder}
      open={open}
      fullWidth="xl"
      maxWidth="md"
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={classes.card}>
        <div className={classes.left}>
          <div className={classes.imgContainer}>
            <img src={product?.data?.image} alt="product" />
          </div>
          {renderSizes()}
        </div>
        <div className={classes.product}>
          <div className={classes.title}>{product?.data?.name}</div>
          <div className={classes.price}>
            <div className={classes.currency}>Rp</div>
            <div className={classes.price}>{product?.data?.price}</div>
          </div>
          <div className={classes.descProduct}>{product?.data?.description}</div>
          {renderBeans()}
          {renderSugarLevels()}
          {renderMilk()}
        </div>
        <div className={classes.action}>
          <div className={classes.qtyCont}>
            <div className={classes.qty}>
              <button type="button" onClick={handleQuantityDecrease}>
                -
              </button>
              <div className={classes.qtyValue}>{quantity}</div>
              <button type="button" onClick={handleQuantityIncrease}>
                +
              </button>
            </div>
          </div>
          <div className={classes.totalPriceCont}>
            <div className={classes.totalPrice}>
              <div className={classes.totalCurrency}>Rp</div>
              <div className={classes.totalValue}>{calculateTotalPrice()}</div>
            </div>
          </div>
          <div className={classes.btnCont}>
            <button type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectSelectedProducts,
});

PopupOrder.propTypes = {
  open: PropTypes.func,
  handleClose: PropTypes.func,
  product: PropTypes.array,
};
export default connect(mapStateToProps)(PopupOrder);
