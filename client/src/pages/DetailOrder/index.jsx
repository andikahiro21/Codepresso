import L from 'leaflet';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

import { getAssetImages } from '@utils/assetHelper';

import ContentPrint from '@pages/DetailOrder/components/ContentPrint';
import { selectHistory, selectRoutes } from '@pages/DetailOrder/selectors';
import { getHistoryOrder, getMapsRoutes } from '@pages/DetailOrder/actions';

import { selectLogin } from '@containers/Client/selectors';

import classes from './style.module.scss';

const DetailOrder = ({ historyOrder, mapRoutes, login }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getHistoryOrder(id));
      await dispatch(getMapsRoutes(id));
      setIsDataLoaded(true);
    };

    fetchData();
  }, [dispatch, id]);

  const position = historyOrder?.message ? [historyOrder.message.lat_end, historyOrder.message.long_end] : null;
  const cafePosisiton = historyOrder?.message
    ? [historyOrder.message.lat_start, historyOrder.message.long_start]
    : null;
  let routes = null;
  if (login) {
    routes = mapRoutes?.routes;
  }
  const userMarker = L.icon({
    iconUrl: getAssetImages('map-maker', '/src/static/images/map-marker.png'),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
  const cafeMarker = L.icon({
    iconUrl: getAssetImages('cafe-location', '/src/static/images/cafeLocation.png'),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  useEffect(() => {
    if (historyOrder?.message?.purchaseGroup_purchase) {
      const calculate = historyOrder?.message?.purchaseGroup_purchase?.reduce(
        (total, purchase) => total + purchase.price * purchase.qty,
        0
      );
      setTotalPrice(calculate);
    }
  }, [historyOrder]);
  return (
    <div className={classes.detailOrder}>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
      {isDataLoaded && position && (
        <div className={classes.map} style={{ width: '100%', height: '70vh' }}>
          <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%', zIndex: 1 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={userMarker}>
              <Popup>{routes}</Popup>
            </Marker>
            <Marker position={cafePosisiton} icon={cafeMarker}>
              <Popup>{routes}</Popup>
            </Marker>

            {routes && <Polyline color="blue" positions={routes} />}
          </MapContainer>
        </div>
      )}
      <ContentPrint totalPrice={totalPrice} ref={ref} orderHistory={historyOrder?.message} />
      <div className={classes.orderDetail}>
        <div className={classes.status}>
          <div className={classes.detailTitle}>Order Status:</div>
          <div className={classes.detailStatus}>{historyOrder?.message?.status}</div>
        </div>
        <div className={classes.status}>
          <div className={classes.detailTitle}>Receiver Name:</div>
          <div className={classes.detailStatus}>{historyOrder?.message?.user_receiver.full_name}</div>
        </div>
        <div className={classes.status}>
          <div className={classes.detailTitle}>Driver Name:</div>
          <div className={classes.detailStatus}>
            {historyOrder?.message?.user_driver
              ? historyOrder?.message?.user_driver?.full_name
              : 'Driver Menunggu Pesanan Untuk Diantar'}
          </div>
        </div>

        <div className={classes.status}>
          <div className={classes.detailTitle}>Note:</div>
          <div className={classes.detailStatus}>{historyOrder?.message?.note}</div>
        </div>
      </div>
    </div>
  );
};

DetailOrder.propTypes = {
  historyOrder: PropTypes.object,
  mapRoutes: PropTypes.object,
  login: PropTypes.bool,
};
const mapStateToProps = createStructuredSelector({
  historyOrder: selectHistory,
  mapRoutes: selectRoutes,
  login: selectLogin,
});

export default connect(mapStateToProps)(DetailOrder);
