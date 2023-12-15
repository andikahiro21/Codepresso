import MainLayout from '@layouts/MainLayout';
import DetailOrder from '@pages/DetailOrder';

import ForgotPassword from '@pages/ForgotPassword';
import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
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
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    protected: false,
    component: ForgotPassword,
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    protected: false,
    component: ResetPassword,
  },
  {
    path: '/products',
    name: 'Products',
    protected: false,
    component: Products,
    layout: MainLayout,
  },
  {
    path: '/detail-order/:id',
    name: 'DetailOrder',
    protected: true,
    component: DetailOrder,
    layout: MainLayout,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
