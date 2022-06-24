import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const HomeRoute = () => {
  const user = useSelector((store) => store.user);

  if (user.data) {
    return <Navigate to='/dashboard' />;
  } else {
    return <Outlet />;
  }
};

export default HomeRoute;
