import React from 'react';
import { Stack, TextField, Divider, Button } from '@mui/material';
import { Positions } from './components';
import { MTM, Strategy, AdvancedSettings } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { addStrategy, updateStrategy } from '../../../api/strategies';
import { useNavigate } from 'react-router-dom';
import {
  onChange,
  updateMTMTarget,
  updateMTMStopLoss,
  updateMTMTrailing,
  updateAdvancedSettings,
} from '../../../redux/slices/strategyTwoSlice';

export default function AddStrategyFormTwo(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const strategyTwo = useSelector((store) => store.strategyTwo);
  const {
    name,
    strategySettings: {
      underlying,
      tradeType,
      duration,
      weekDays,
      startTime,
      endTime,
      nextDayEndTime,
      checkConditionNextDayAfter,
      daysBeforeExpiry,
    },
  } = strategyTwo;

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    dispatch(onChange({ name, value }));
  }

  function handleSubmit() {
    const { isEditing, editStrategyId, ...newState } = strategyTwo;
    if (isEditing) {
      return dispatch(
        updateStrategy({ id: editStrategyId, state: newState, navigate })
      );
    }
    dispatch(addStrategy({ strategy: newState, navigate }));
  }

  return (
    <Stack spacing={4} divider={<Divider orientation='horizontal' flexItem />}>
      <TextField
        name='name'
        value={name}
        label='Strategy Name'
        variant='standard'
        onChange={handleChange}
      />
      <Strategy
        {...{
          underlying,
          tradeType,
          duration,
          weekDays,
          startTime,
          endTime,
          nextDayEndTime,
          checkConditionNextDayAfter,
          daysBeforeExpiry,
          handleChange,
        }}
      />
      <Positions />
      <MTM
        {...{
          updateMTMTarget,
          updateMTMStopLoss,
          updateMTMTrailing,
          strategy: 'strategyTwo',
        }}
      />
      <AdvancedSettings
        {...{
          updateAdvancedSettings,
          strategy: 'strategyTwo',
        }}
      />
      <Button
        variant='contained'
        sx={{ width: 'fit-content' }}
        onClick={handleSubmit}
      >
        Save settings
      </Button>
    </Stack>
  );
}
