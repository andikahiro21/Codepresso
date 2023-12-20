import MainLayout from '@layouts/MainLayout';
import CreateDriver from '@pages/CreateDriver';
import CreateMenu from '@pages/CreateMenu';
import DetailOrder from '@pages/DetailOrder';
import EditMenu from '@pages/EditMenu';

import ForgotPassword from '@pages/ForgotPassword';
import Home from '@pages/Home';
import Login from '@pages/Login';
import ManageOrder from '@pages/ManageOrder';
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
    userOnly: true,
    driverOnly: false,
  },
  {
    path: '/order-history',
    name: 'OrderHistory',
    protected: true,
    component: OrderHistory,
    layout: MainLayout,
    adminOnly: false,
    userOnly: true,
    driverOnly: false,
  },
  {
    path: '/create-menu',
    name: 'CreateMenu',
    protected: true,
    component: CreateMenu,
    layout: MainLayout,
    adminOnly: true,
    userOnly: false,
    driverOnly: false,
  },
  {
    path: '/edit-menu/:id',
    name: 'EditMenu',
    protected: true,
    component: EditMenu,
    layout: MainLayout,
    adminOnly: true,
    userOnly: false,
    driverOnly: false,
  },

  {
    path: '/create-driver',
    name: 'CreateDriver',
    protected: true,
    component: CreateDriver,
    layout: MainLayout,
    adminOnly: true,
    userOnly: false,
    driverOnly: false,
  },

  {
    path: '/manage-order',
    name: 'ManageOrder',
    protected: true,
    component: ManageOrder,
    layout: MainLayout,
    adminOnly: true,
    userOnly: false,
    driverOnly: false,
  },

  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
