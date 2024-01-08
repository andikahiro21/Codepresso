/* eslint-disable no-useless-catch */
import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  auth: 'auth',
  menu: 'menu',
  category: 'category',
  address: 'address',
  addons: 'add-ons',
  basket: 'basket',
  map: 'map',
  payment: 'payment',
  purchase: 'purchase',
  chat: 'chat',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  try {
    const response = await request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Auth
export const login = (data) => callAPI('/auth/login', 'POST', {}, {}, data);
export const register = (data) => callAPI('/auth/register', 'POST', {}, {}, data);
export const forgotPassword = (data) => callAPI('/auth/forgot-password', 'POST', {}, {}, data);
export const resetPassword = (token, data) => callAPI(`/auth/reset-password/${token}`, 'PUT', {}, {}, data);
export const registerDriver = (data) =>
  callAPI(`${urls.auth}/register-driver`, 'POST', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const driverList = () => callAPI(`${urls.auth}/check-driver`, 'GET');

// Products
export const getAllProducts = (data) => callAPI(`${urls.menu}/?page=${data}`, 'GET');
export const getSelectedProducts = (id) => callAPI(`${urls.addons}/${id}`, 'GET');
export const createProducts = (data) =>
  callAPI(`${urls.menu}`, 'POST', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const deleteProducts = (id) => callAPI(`${urls.menu}/${id}`, 'DELETE');
export const editMenu = (data, id) =>
  callAPI(`${urls.menu}/${id}`, 'PUT', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const enableProduct = (id) => callAPI(`${urls.menu}/enable/${id}`, 'PUT');
export const disableProduct = (id) => callAPI(`${urls.menu}/disable/${id}`, 'PUT');

// Categories
export const getCategories = () => callAPI(`${urls.category}`, 'GET');
export const deleteCategory = (id) => callAPI(`${urls.category}/${id}`, 'DELETE');
export const addCategory = (data) => callAPI(`${urls.category}`, 'POST', {}, {}, data);

// Address
export const getAddress = () => callAPI(`${urls.address}`, 'GET');
export const createAddress = (data) => callAPI(`${urls.address}`, 'POST', {}, {}, data);
export const setActiveAddress = ({ id }) => callAPI(`${urls.address}/set-active/${id}`, 'PUT');
export const deleteAddress = (id) => callAPI(`${urls.address}/${id}`, 'DELETE');

// Basket
export const setBasket = (data) => callAPI(`${urls.basket}`, 'POST', {}, {}, data);
export const getBaskets = () => callAPI(`${urls.basket}`, 'GET');
export const editBaskets = ({ id, data }) => callAPI(`${urls.basket}/${id}`, 'PUT', {}, {}, data);
export const deleteBaskets = (id) => callAPI(`${urls.basket}/${id}`, 'DELETE');

// Map
export const getDistance = () => callAPI(`${urls.map}/distance`, 'GET');
export const getMapRoutes = (id) => callAPI(`${urls.map}/route/${id}`, 'GET');

// Payment
export const payment = (data) => callAPI(`${urls.payment}`, 'POST', {}, {}, data);
export const notificationMidtrans = (token) => callAPI(`${urls.payment}/notification`, 'POST', { token }, {}, {});

// Purchases
export const getHistoryOrder = (id) => callAPI(`${urls.purchase}/${id}`, 'GET');
export const getAllOrder = (page) => callAPI(`${urls.purchase}/?page=${page}`, 'GET');
export const getAllOrderAdmin = (page) => callAPI(`${urls.purchase}/admin/?page=${page}`, 'GET');
export const setOrderDelivery = (id, driverID) =>
  callAPI(`${urls.purchase}/set-delivery/${id}`, 'PUT', {}, {}, { driverID });
export const getActivePurchase = () => callAPI(`${urls.purchase}/active-purchase`, 'GET');
export const setFinishOrder = (id) => callAPI(`${urls.purchase}/set-finish/${id}`, 'PUT');

//chat
export const getToken = () => callAPI(`${urls.chat}/token`, 'GET');
export const setChannel = (data) => callAPI(`${urls.chat}/create-channel`, 'POST', {}, {}, data);
export const deleteChannel = (data) => callAPI(`${urls.chat}/delete-channel`, 'DELETE', {}, {}, data);
