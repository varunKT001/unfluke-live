import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { MiniDrawer } from '../components';

const PrivateRoute = (props) => {
  const user = useSelector((store) => store.user);

  if (!user.data) {
    return <Navigate to='/login' />;
  } else {
    return (
      <MiniDrawer>
        <Outlet />
      </MiniDrawer>
    );
  }
};

export default PrivateRoute;
