import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
  updateMTMStopLoss,
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
} from '@mui/material';

export default function MTMStopLoss() {
  const dispatch = useDispatch();
  const { MTMStopLoss } = useSelector((store) => store.strategy);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'fixedStopLoss' && value === 'None') {
      const payload = { name: 'value', value: 0 };
      dispatch(updateMTMStopLoss(payload));
    }
    if (name === 'profitLockTrailingStopLoss.value') {
      const payload = {
        name: 'profitLockTrailingStopLoss.values',
      };
      if (value === 'trailing_stoploss' || value === 'lock_profit') {
        payload.value = { x: 0, y: 0 };
        dispatch(updateMTMStopLoss(payload));
      }
      if (value === 'trail_profit') {
        payload.value = { a: 0, b: 0 };
        dispatch(updateMTMStopLoss(payload));
      }
      if (value === 'lock_and_trail_profit') {
        payload.value = { x: 0, y: 0, a: 0, b: 0 };
        dispatch(updateMTMStopLoss(payload));
      }
      if (value === 'None') {
        dispatch(deleteStateProp(`MTMStopLoss.${payload.name}`));
      }
    }
    if (name.split('.')[0] === 'profitLockTrailingStopLoss') {
      if (value < 0) {
        value = 0;
      }
    }
    const payload = {
      name,
      value,
    };
    dispatch(updateMTMStopLoss(payload));
  }

  return (
    <Stack spacing={2} width='50%'>
      <Typography variant='button' color='grey.600'>
        mtm stoploss
      </Typography>
      <Stack direction='row' spacing={4}>
        {/* //////////////////////////// */}
        {/* //// MTM FIXED STOPLOSS //// */}
        {/* //////////////////////////// */}
        <Stack spacing={1} width='65%'>
          <Typography>Fixed Stoploss</Typography>
          <FormControl size='small'>
            <Select
              name='fixedStopLoss'
              value={MTMStopLoss.fixedStopLoss}
              onChange={handleChange}
            >
              <MenuItem value='None'>None</MenuItem>
              <MenuItem value='mtm_in_percentage'>MTM in percentage</MenuItem>
              <MenuItem value='mtm_in_total_amount'>
                MTM in total amount
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* /////////////////// */}
        {/* //// MTM VALUE //// */}
        {/* /////////////////// */}
        <Stack spacing={1}>
          <Typography>Value</Typography>
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
      <Stack spacing={2}>
        {/* /////////////////////////////////////// */}
        {/* //// PROFIT LOCK TRAILING STOPLOSS //// */}
        {/* /////////////////////////////////////// */}
        <Stack spacing={1}>
          <Typography>Profit lock Trailing stoploss</Typography>
          <FormControl size='small'>
            <Select
              name='profitLockTrailingStopLoss.value'
              value={MTMStopLoss.profitLockTrailingStopLoss.value}
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
        {MTMStopLoss.profitLockTrailingStopLoss.value !== 'None' && (
          <Stack spacing={1}>
            <Typography>Type</Typography>
            <FormControl size='small'>
              <Select
                name='profitLockTrailingStopLoss.type'
                value={MTMStopLoss.profitLockTrailingStopLoss.type}
                onChange={handleChange}
              >
                <MenuItem value='percentage'>Percentage</MenuItem>
                <MenuItem value='total_amount'>Total amount (MTM)</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
        {/* ////////////////////////////////////////////// */}
        {/* //// PROFIT LOCK TRAILING STOPLOSS VALUES //// */}
        {/* ////////////////////////////////////////////// */}
        {MTMStopLoss.profitLockTrailingStopLoss.value ===
          'trailing_stoploss' && (
          <Stack direction='row' spacing={4}>
            <Stack spacing={1} width='50%'>
              <Typography>For every increase in profit by (X)</Typography>
              <TextField
                size='small'
                type='number'
                name='profitLockTrailingStopLoss.values.x'
                value={MTMStopLoss.profitLockTrailingStopLoss.values.x}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {MTMStopLoss.profitLockTrailingStopLoss.type ===
                      'total_amount' ? (
                        <CurrencyRupeeIcon />
                      ) : (
                        <PercentIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={1} width='50%'>
              <Typography>Trail stoploss by (Y)</Typography>
              <TextField
                size='small'
                type='number'
                name='profitLockTrailingStopLoss.values.y'
                value={MTMStopLoss.profitLockTrailingStopLoss.values.y}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {MTMStopLoss.profitLockTrailingStopLoss.type ===
                      'total_amount' ? (
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
        {MTMStopLoss.profitLockTrailingStopLoss.value === 'lock_profit' && (
          <Stack direction='row' spacing={4}>
            <Stack spacing={1} width='50%'>
              <Typography>If profit reaches (X)</Typography>
              <TextField
                size='small'
                type='number'
                name='profitLockTrailingStopLoss.values.x'
                value={MTMStopLoss.profitLockTrailingStopLoss.values.x}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {MTMStopLoss.profitLockTrailingStopLoss.type ===
                      'total_amount' ? (
                        <CurrencyRupeeIcon />
                      ) : (
                        <PercentIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={1} width='50%'>
              <Typography>Lock profits at (Y)</Typography>
              <TextField
                size='small'
                type='number'
                name='profitLockTrailingStopLoss.values.y'
                value={MTMStopLoss.profitLockTrailingStopLoss.values.y}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {MTMStopLoss.profitLockTrailingStopLoss.type ===
                      'total_amount' ? (
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
        {MTMStopLoss.profitLockTrailingStopLoss.value === 'trail_profit' && (
          <Stack direction='row' spacing={4}>
            <Stack spacing={1} width='50%'>
              <Typography>For every increase in profit by (A)</Typography>
              <TextField
                size='small'
                type='number'
                name='profitLockTrailingStopLoss.values.a'
                value={MTMStopLoss.profitLockTrailingStopLoss.values.a}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {MTMStopLoss.profitLockTrailingStopLoss.type ===
                      'total_amount' ? (
                        <CurrencyRupeeIcon />
                      ) : (
                        <PercentIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={1} width='50%'>
              <Typography>Trail minimum profit by (B)</Typography>
              <TextField
                size='small'
                type='number'
                name='profitLockTrailingStopLoss.values.b'
                value={MTMStopLoss.profitLockTrailingStopLoss.values.b}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {MTMStopLoss.profitLockTrailingStopLoss.type ===
                      'total_amount' ? (
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
        {MTMStopLoss.profitLockTrailingStopLoss.value ===
          'lock_and_trail_profit' && (
          <Stack spacing={2}>
            <Stack direction='row' spacing={4}>
              <Stack spacing={1} width='50%'>
                <Typography>If profit reaches (X)</Typography>
                <TextField
                  size='small'
                  type='number'
                  name='profitLockTrailingStopLoss.values.x'
                  value={MTMStopLoss.profitLockTrailingStopLoss.values.x}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {MTMStopLoss.profitLockTrailingStopLoss.type ===
                        'total_amount' ? (
                          <CurrencyRupeeIcon />
                        ) : (
                          <PercentIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack spacing={1} width='50%'>
                <Typography>Lock profits at (Y)</Typography>
                <TextField
                  size='small'
                  type='number'
                  name='profitLockTrailingStopLoss.values.y'
                  value={MTMStopLoss.profitLockTrailingStopLoss.values.y}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {MTMStopLoss.profitLockTrailingStopLoss.type ===
                        'total_amount' ? (
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
            <Stack direction='row' spacing={4}>
              <Stack spacing={1} width='50%'>
                <Typography>For every increase in profit by (A)</Typography>
                <TextField
                  size='small'
                  type='number'
                  name='profitLockTrailingStopLoss.values.a'
                  value={MTMStopLoss.profitLockTrailingStopLoss.values.a}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {MTMStopLoss.profitLockTrailingStopLoss.type ===
                        'total_amount' ? (
                          <CurrencyRupeeIcon />
                        ) : (
                          <PercentIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack spacing={1} width='50%'>
                <Typography>Trail minimum profit by (B)</Typography>
                <TextField
                  size='small'
                  type='number'
                  name='profitLockTrailingStopLoss.values.b'
                  value={MTMStopLoss.profitLockTrailingStopLoss.values.b}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {MTMStopLoss.profitLockTrailingStopLoss.type ===
                        'total_amount' ? (
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
        )}
      </Stack>
    </Stack>
  );
}
