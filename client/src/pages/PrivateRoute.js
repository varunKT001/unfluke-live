import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { MiniDrawer } from '../components';

const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  if (!user.data) {
    return <Navigate to='/login' />;
  } else {
    return children;
  }
};

export default PrivateRoute;
