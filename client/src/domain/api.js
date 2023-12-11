/* eslint-disable no-useless-catch */
import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  auth: 'auth',
  menu: 'menu',
  category: 'category',
  address: 'address',
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

// Categories
export const getCategories = () => callAPI(`${urls.category}`, 'GET');

// Address
export const getAddress = () => callAPI(`${urls.address}`, 'GET');
