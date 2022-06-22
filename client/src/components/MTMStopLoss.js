import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { updateMTMStopLoss } from '../redux/slices/strategySlice';
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

export default function MTMStopLoss() {
  const dispatch = useDispatch();
  const { MTMStopLoss } = useSelector((store) => store.strategy);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    if (name === 'fixedStopLoss' && value === 'None') {
      const payload = { name: 'value', value: 0 };
      dispatch(updateMTMStopLoss(payload));
    }
    if (name === 'value' && value < 0) {
      value = 0;
    }
    const payload = {
      name,
      value,
    };
    dispatch(updateMTMStopLoss(payload));
  }
  function handleMTMFixedStoploss(event, value) {
    const name = 'fixedStopLoss';
    const payload = { name, value };
    dispatch(updateMTMStopLoss(payload));
  }

  return (
    <Stack spacing={2}>
      <Typography variant='button' color='grey.600'>
        mtm stoploss
      </Typography>
      <Stack direction='row' spacing={4}>
        {/* //////////////////////////// */}
        {/* //// MTM FIXED STOPLOSS //// */}
        {/* //////////////////////////// */}
        <Stack spacing={1}>
          <Typography fontSize='14px'>Fixed Stoploss</Typography>
          <ToggleButtonGroup
            size='small'
            color='primary'
            exclusive
            value={MTMStopLoss.fixedStopLoss}
            onChange={handleMTMFixedStoploss}
          >
            <ToggleButton value='None'>None</ToggleButton>
            <ToggleButton value='mtm_in_percentage'>%</ToggleButton>
            <ToggleButton value='mtm_in_total_amount'>₹</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {/* /////////////////// */}
        {/* //// MTM VALUE //// */}
        {/* /////////////////// */}
        <Stack spacing={1} width='150px'>
          <Typography fontSize='14px'>Value</Typography>
          <TextField
            size='small'
            type='number'
            name='value'
            value={MTMStopLoss.value}
            disabled={MTMStopLoss.fixedStopLoss === 'None'}
            onChange={handleChange}
            InputProps={{
              startAdornment: MTMStopLoss.fixedStopLoss !== 'None' && (
                <InputAdornment position='start'>
                  {MTMStopLoss.fixedStopLoss === 'mtm_in_total_amount' ? (
                    <CurrencyRupeeIcon />
                  ) : (
                    <PercentIcon />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
