import React from 'react';
import {Navigate} from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './containers/Settings/Account';
import PostList from './containers/Post/PostList';
import PostForm from './containers/Post/PostForm';
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './containers/Auth/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './containers/Auth/Register';
import Home from './containers/Home/Home';
import Settings from './containers/Settings/Settings';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout/>,
    children: [
      {path: 'account', element: <Account/>},
      {path: 'posts', element: <PostList/>},
      {path: 'posts/edit', element: <PostForm/>},
      {path: 'posts/edit/:id', element: <PostForm/>},
      {path: 'dashboard', element: <Dashboard/>},
      {path: 'home', element: <Home/>},
      {path: 'products', element: <ProductList/>},
      {path: 'settings', element: <Settings/>},
      {path: '*', element: <Navigate to="/404"/>}
    ]
  },
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {path: 'login', element: <Login/>},
      {path: 'register', element: <Register/>},
      {path: '404', element: <NotFound/>},
      {path: 'home', element: <Home/>},
      {path: '/', element: <Navigate to="home"/>},
      {path: '*', element: <Navigate to="/404"/>}
    ]
  }
];

export default routes;
