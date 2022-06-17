import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../api/user';
const Dashboard = () => {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(logout())}>logout</button>;
};

export default Dashboard;
