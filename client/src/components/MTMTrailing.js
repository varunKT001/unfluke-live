import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
  updateMTMTrailing,
  deleteStateProp,
} from '../redux/slices/strategySlice';
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

export default function MTMTrailing() {
  const dispatch = useDispatch();
  const { MTMTrailing } = useSelector((store) => store.strategy);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    if (name === 'value') {
      if (value === 'None') {
        dispatch(deleteStateProp(`MTMTrailing.values`));
      } else {
        const payload = { name: 'values', value: { x: 0, y: 0 } };
        dispatch(updateMTMTrailing(payload));
      }
    }
    if (name.split('.')[0] === 'values' && value < 0) {
      value = 0;
    }
    const payload = {
      name,
      value,
    };
    dispatch(updateMTMTrailing(payload));
  }
  function handleTrailingStopLossType(event, value) {
    const name = 'type';
    if (value !== null) {
      const payload = { name, value };
      dispatch(updateMTMTrailing(payload));
    }
  }

  return (
    <Stack spacing={2}>
      <Typography variant='button' color='grey.600'>
        mtm trailing
      </Typography>
      <Stack direction='row' spacing={4}>
        {/* /////////////////////////////////////// */}
        {/* //// PROFIT LOCK TRAILING STOPLOSS //// */}
        {/* /////////////////////////////////////// */}
        <Stack spacing={1}>
          <Typography fontSize='14px'>Profit lock trailing stoploss</Typography>
          <FormControl size='small'>
            <Select
              name='value'
              value={MTMTrailing.value}
              onChange={handleChange}
            >
              <MenuItem value='trailing_stoploss'>Trailing Stoploss</MenuItem>
              <MenuItem value='lock_profit'>Lock profit</MenuItem>
              <MenuItem value='trail_profit'>Trail profit</MenuItem>
              <MenuItem value='lock_and_trail_profit'>
                Lock and Trail profit
              </MenuItem>
              <MenuItem value='None'>None</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* //////////////////////////////////////////// */}
        {/* //// PROFIT LOCK TRAILING STOPLOSS TYPE //// */}
        {/* //////////////////////////////////////////// */}
        {MTMTrailing.value !== 'None' && (
          <Stack spacing={1}>
            <Typography fontSize='14px'>Type</Typography>
            <ToggleButtonGroup
              size='small'
              exclusive
              value={MTMTrailing.type}
              onChange={handleTrailingStopLossType}
            >
              <ToggleButton value='percentage' color='secondary'>
                %
              </ToggleButton>
              <ToggleButton value='total_amount' color='success'>
                ₹
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        )}
        {/* ////////////////////////////////////////////// */}
        {/* //// PROFIT LOCK TRAILING STOPLOSS VALUES //// */}
        {/* ////////////////////////////////////////////// */}
        {MTMTrailing.value !== 'None' && (
          <Stack direction='row' spacing={4}>
            <Stack spacing={1} width='200px'>
              <Typography fontSize='12px'>
                {MTMTrailing.value === 'trailing_stoploss'
                  ? 'For every increase in profit by (X)'
                  : MTMTrailing.value === 'lock_profit'
                  ? 'If profit reaches (X)'
                  : MTMTrailing.value === 'trail_profit'
                  ? 'For every increase in profit by (X)'
                  : 'If profit reaches (X)'}
              </Typography>
              <TextField
                size='small'
                type='number'
                name='values.x'
                value={MTMTrailing.values.x}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {MTMTrailing.type === 'total_amount' ? (
                        <CurrencyRupeeIcon />
                      ) : (
                        <PercentIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={1} width='200px'>
              <Typography fontSize='12px'>
                {MTMTrailing.value === 'trailing_stoploss'
                  ? 'Trail stoploss by (Y)'
                  : MTMTrailing.value === 'lock_profit'
                  ? 'Lock profits at (Y)'
                  : MTMTrailing.value === 'trail_profit'
                  ? 'Trail minimum profit by (Y)'
                  : 'Lock profits at (Y)'}
              </Typography>
              <TextField
                size='small'
                type='number'
                name='values.y'
                value={MTMTrailing.values.y}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {MTMTrailing.type === 'total_amount' ? (
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
        )}
      </Stack>
    </Stack>
  );
}
