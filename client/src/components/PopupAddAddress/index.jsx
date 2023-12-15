/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import MapMarker from '@static/images/map-marker.png';
import { addAddress } from '@containers/Client/actions';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import { selectDistance } from '@containers/Client/selectors';
import classes from './style.module.scss';

const Markers = ({ selectedPosition, setSelectedPosition }) => {
  useMapEvents({
    click(e) {
      setSelectedPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  const customMarkerIcon = L.icon({
    iconUrl: MapMarker,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return selectedPosition ? (
    <Marker key={selectedPosition[0]} position={selectedPosition} icon={customMarkerIcon} interactive={false} />
  ) : null;
};
const PopupAddAddress = ({ open, handleClose }) => {
  const [position, setPosition] = useState([-6.3318223394969015, 106.83486249414803]);
  const [addressName, setAddressName] = useState('');
  const dispatch = useDispatch();

  const handleSave = async () => {
    const data = {
      lat: position[0],
      long: position[1],
      address_name: addressName,
    };
    dispatch(addAddress(data));
    handleClose();
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      setAddressName(data.display_name);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    getAddressFromCoordinates(position[0], position[1]);
  }, [position]);

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
        <div className={classes.cardTitle}>Add New Address</div>
        <div className={classes.map}>
          <MapContainer center={position} zoom={20} interactive={false} style={{ width: '100%', height: '300px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Markers selectedPosition={position} setSelectedPosition={setPosition} />
          </MapContainer>
        </div>
        <div className={classes.checkout}>
          <div className={classes.btnContainer}>
            <button type="button" onClick={handleSave}>
              Save Address
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

PopupAddAddress.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  distance: selectDistance,
});

export default connect(mapStateToProps)(PopupAddAddress);
