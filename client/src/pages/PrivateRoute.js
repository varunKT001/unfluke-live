import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
  const user = useSelector((store) => store.user);

  if (!user.data) {
    return <Navigate to='/login' />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
