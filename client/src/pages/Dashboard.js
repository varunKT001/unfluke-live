import React from 'react';
import { Button, Stack } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick(event) {
    const name = event.target.name;
    navigate(`${location.pathname}/${name}`);
  }

  return (
    <Stack direction='row' spacing={2}>
      <Button
        name='add-strategy-1'
        variant='contained'
        onClick={handleClick}
        startIcon={<AddCircleIcon />}
      >
        create strategy
      </Button>
      <Button
        name='add-strategy-2'
        variant='contained'
        onClick={handleClick}
        startIcon={<AddCircleIcon />}
      >
        create strategy 2
      </Button>
    </Stack>
  );
};

export default Dashboard;
