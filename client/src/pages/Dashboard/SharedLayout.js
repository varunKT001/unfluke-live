import React from 'react';
import { MiniDrawer } from '../../components';
import { Outlet } from 'react-router-dom';

export default function SharedLayout() {
  return (
    <MiniDrawer>
      <Outlet />
    </MiniDrawer>
  );
}
