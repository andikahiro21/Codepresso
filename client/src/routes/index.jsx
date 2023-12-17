import MainLayout from '@layouts/MainLayout';
import DetailOrder from '@pages/DetailOrder';

import ForgotPassword from '@pages/ForgotPassword';
import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import OrderHistory from '@pages/OrderHistory';
import Products from '@pages/Products';
import Register from '@pages/Register';
import ResetPassword from '@pages/ResetPassword';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
    adminOnly: false,
    userOnly: false,
    driverOnly: false,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    adminOnly: false,
    userOnly: false,
    driverOnly: false,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    adminOnly: false,
    userOnly: false,
    driverOnly: false,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    protected: false,
    component: ForgotPassword,
    adminOnly: false,
    userOnly: false,
    driverOnly: false,
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    protected: false,
    component: ResetPassword,
    adminOnly: false,
    userOnly: false,
    driverOnly: false,
  },
  {
    path: '/products',
    name: 'Products',
    protected: false,
    component: Products,
    layout: MainLayout,
    adminOnly: false,
    userOnly: false,
    driverOnly: false,
  },
  {
    path: '/detail-order/:id',
    name: 'DetailOrder',
    protected: true,
    component: DetailOrder,
    layout: MainLayout,
    adminOnly: false,
    userOnly: false,
    driverOnly: false,
  },
  {
    path: '/order-history',
    name: 'OrderHistory',
    protected: true,
    component: OrderHistory,
    layout: MainLayout,
    adminOnly: false,
    userOnly: false,
    driverOnly: false,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
