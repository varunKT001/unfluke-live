import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { onChange } from '../../../redux/slices/brokerSlice';
import { SimpleMenu } from '../../../components';
import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  CardActions,
} from '@mui/material';

export default function AddBroker() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleChangeBroker(e) {
    const name = 'broker';
    const broker = e.target.dataset.broker;
    const value = e.target.dataset.value;
    dispatch(onChange({ name, value: broker }));
    if (value === 'with_api') {
      dispatch(onChange({ name: 'api', value: true }));
    }
    if (value === 'without_api') {
      dispatch(onChange({ name: 'api', value: false }));
    }
    navigate(`${location.pathname}/${broker}`);
  }

  return (
    <Stack spacing={4}>
      <Typography>Choose a broker to start the setup...</Typography>
      <Stack direction='row'>
        <Card sx={{ maxWidth: 200, p: 2 }}>
          <CardMedia
            component='img'
            image='https://zerodha.com/static/images/logo.svg'
            alt='zerodha'
          />
          <CardContent sx={{ px: 0, mt: 4 }}>
            <Typography
              align='center'
              gutterBottom
              variant='button'
              component='div'
            >
              Zerodha
            </Typography>
          </CardContent>
          <CardActions>
            <SimpleMenu label='setup' variant='contained' fullWidth>
              <MenuItem
                data-broker='zerodha'
                data-value='with_api'
                onClick={handleChangeBroker}
              >
                With API
              </MenuItem>
              <MenuItem
                data-broker='zerodha'
                data-value='without_api'
                onClick={handleChangeBroker}
              >
                Without API
              </MenuItem>
            </SimpleMenu>
          </CardActions>
        </Card>
      </Stack>
    </Stack>
  );
}
