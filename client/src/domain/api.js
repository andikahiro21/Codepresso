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

// Products
export const getAllProducts = () => callAPI(`${urls.menu}`, 'GET');
export const getSelectedProducts = (id) => callAPI(`${urls.addons}/${id}`, 'GET');

// Categories
export const getCategories = () => callAPI(`${urls.category}`, 'GET');

// Address
export const getAddress = () => callAPI(`${urls.address}`, 'GET');
export const setActiveAddress = ({ id }) => callAPI(`${urls.address}/set-active/${id}`, 'PUT');

// Basket
export const setBasket = (data) => callAPI(`${urls.basket}`, 'POST', {}, {}, data);
export const getBaskets = () => callAPI(`${urls.basket}`, 'GET');
export const editBaskets = ({ id, data }) => callAPI(`${urls.basket}/${id}`, 'PUT', {}, {}, data);
export const deleteBaskets = (id) => callAPI(`${urls.basket}/${id}`, 'DELETE');

// Map
export const getDistance = () => callAPI(`${urls.map}/distance`, 'GET');
