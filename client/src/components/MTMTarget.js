import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PercentIcon from '@mui/icons-material/Percent';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

export default function MTMTarget({ updateMTMTarget, strategy }) {
  const dispatch = useDispatch();
  const { MTMTarget } = useSelector((store) => store[strategy]);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    if (name === 'value' && value < 0) {
      value = 0;
    }
    const payload = { name, value };
    dispatch(updateMTMTarget(payload));
  }
  function handleMTMType(event, value) {
    const name = 'type';
    if (value !== null) {
      if (value === 'None') {
        const payload = { name: 'value', value: 0 };
        dispatch(updateMTMTarget(payload));
      }
      const payload = { name, value };
      dispatch(updateMTMTarget(payload));
    }
  }

  return (
    <Stack spacing={2}>
      <Typography variant='button' color='grey.600'>
        mtm target
      </Typography>
      <Stack direction='row' spacing={4}>
        {/* ////////////////// */}
        {/* //// MTM TYPE //// */}
        {/* ////////////////// */}
        <Stack spacing={1}>
          <Typography fontSize='14px'>Type</Typography>
          <ToggleButtonGroup
            size='small'
            exclusive
            value={MTMTarget.type}
            onChange={handleMTMType}
          >
            <ToggleButton color='error' value='None'>
              None
            </ToggleButton>
            <ToggleButton color='secondary' value='mtm_in_percentage'>
              %
            </ToggleButton>
            <ToggleButton color='success' value='mtm_in_total_amount'>
              ₹
            </ToggleButton>
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
