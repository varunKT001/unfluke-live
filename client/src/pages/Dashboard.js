import React from 'react';
import { AlgorithmForm, MiniDrawer } from '../components';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <MiniDrawer>
      <AlgorithmForm />
    </MiniDrawer>
  );
};

export default Dashboard;
