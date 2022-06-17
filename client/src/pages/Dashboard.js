import React from 'react';
import { Form, MiniDrawer } from '../components';
import { useDispatch } from 'react-redux';
import { logout } from '../api/user';

const Dashboard = () => {
  const dispatch = useDispatch();

  return <MiniDrawer></MiniDrawer>;
};

export default Dashboard;
