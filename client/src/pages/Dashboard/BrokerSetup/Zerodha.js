import React from 'react';
import { onChange } from '../../../redux/slices/brokerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addBroker } from '../../../api/broker';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

export default function Zerodha() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const broker = useSelector((store) => store.broker);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(onChange({ name, value }));
  }

  function handleSubmit() {
    if (
      !broker.userID ||
      !broker.password ||
      !broker.totp_secret ||
      (broker.api && (!broker.api_key || !broker.secret))
    ) {
      return alert('Provide all fields');
    }
    dispatch(addBroker({ broker, navigate }));
  }

  return (
    <Stack spacing={4}>
      <Typography variant='h6'>
        Zerodha Setup ({broker.api ? 'With API' : 'Without API'})
      </Typography>
      {/* ///////////////// */}
      {/* //// USER ID //// */}
      {/* ///////////////// */}
      <Stack spacing={1} sx={{ minWidth: '35%', maxWidth: '50%' }}>
        <Typography>User ID</Typography>
        <TextField
          size='small'
          name='userID'
          value={broker.userID}
          onChange={handleChange}
        />
      </Stack>
      {/* ////////////////// */}
      {/* //// PASSWORD //// */}
      {/* ////////////////// */}
      <Stack spacing={1} sx={{ minWidth: '35%', maxWidth: '50%' }}>
        <Typography>Password</Typography>
        <TextField
          size='small'
          name='password'
          value={broker.password}
          onChange={handleChange}
        />
      </Stack>
      {!broker.api ? (
        <>
          {/* /////////////////// */}
          {/* //// AUTH TYPE //// */}
          {/* /////////////////// */}
          <Stack spacing={1} sx={{ minWidth: '35%', maxWidth: '50%' }}>
            <Typography>Password</Typography>
            <FormControl size='small'>
              <Select
                name='auth_type'
                value={broker.auth_type}
                onChange={handleChange}
              >
                <MenuItem value='totp'>TOTP</MenuItem>
                <MenuItem value='pin'>PIN</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {/* ///////////////////////// */}
          {/* //// TOTP SECRET/PIN //// */}
          {/* ///////////////////////// */}
          <Stack spacing={1} sx={{ minWidth: '35%', maxWidth: '50%' }}>
            <Typography>
              {broker.auth_type === 'totp' ? 'TOTP Secret' : 'PIN'}
            </Typography>
            <TextField
              size='small'
              name={broker.auth_type === 'totp' ? 'totp_secret' : 'pin'}
              value={
                broker.auth_type === 'totp' ? broker.totp_secret : broker.pin
              }
              onChange={handleChange}
            />
          </Stack>
        </>
      ) : (
        <>
          {/* ///////////////////////// */}
          {/* //// TOTP SECRET //// */}
          {/* ///////////////////////// */}
          <Stack spacing={1} sx={{ minWidth: '35%', maxWidth: '50%' }}>
            <Typography>TOTP Secret</Typography>
            <TextField
              size='small'
              name='totp_secret'
              value={broker.totp_secret}
              onChange={handleChange}
            />
          </Stack>
        </>
      )}

      {broker.api && (
        <>
          {/* ///////////////// */}
          {/* //// API KEY //// */}
          {/* ///////////////// */}
          <Stack spacing={1} sx={{ minWidth: '35%', maxWidth: '50%' }}>
            <Typography>API Key</Typography>
            <TextField
              size='small'
              name='api_key'
              value={broker.api_key}
              onChange={handleChange}
            />
          </Stack>
          {/* //////////////////// */}
          {/* //// API SECRET //// */}
          {/* //////////////////// */}
          <Stack spacing={1} sx={{ minWidth: '35%', maxWidth: '50%' }}>
            <Typography>API Secret</Typography>
            <TextField
              size='small'
              name='secret'
              value={broker.secret}
              onChange={handleChange}
            />
          </Stack>
        </>
      )}
      <Button
        variant='contained'
        sx={{ width: 'fit-content' }}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Stack>
  );
}
