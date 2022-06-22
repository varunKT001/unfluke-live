import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { updateMTMTarget } from '../redux/slices/strategySlice';
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

export default function MTMTarget() {
  const dispatch = useDispatch();
  const { MTMTarget } = useSelector((store) => store.strategy);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'type' && value === 'None') {
      const payload = { name: 'value', value: 0 };
      dispatch(updateMTMTarget(payload));
    }
    const payload = {
      name,
      value,
    };
    dispatch(updateMTMTarget(payload));
  }

  return (
    <Stack spacing={2} width='50%'>
      <Typography variant='button' color='grey.600'>
        mtm target
      </Typography>
      <Stack direction='row' spacing={4}>
        {/* ////////////////// */}
        {/* //// MTM TYPE //// */}
        {/* ////////////////// */}
        <Stack spacing={1} width='65%'>
          <Typography>Type</Typography>
          <FormControl size='small'>
            <Select name='type' value={MTMTarget.type} onChange={handleChange}>
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
            value={MTMTarget.value}
            disabled={MTMTarget.type === 'None'}
            onChange={handleChange}
            InputProps={{
              startAdornment: MTMTarget.type !== 'None' && (
                <InputAdornment position='start'>
                  {MTMTarget.type === 'mtm_in_total_amount' ? (
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
