import React from 'react';
import { Stack, TextField, Divider, Button } from '@mui/material';
import { Positions } from './components';
import { MTM, Strategy, AdvancedSettings } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  onChange,
  updateMTMTarget,
  updateMTMStopLoss,
  updateMTMTrailing,
  updateAdvancedSettings,
} from '../../../redux/slices/strategyOneSlice';
import { addStrategy, updateStrategy } from '../../../api/strategies';

export default function AddStrategyFormOne(props) {
  const dispatch = useDispatch();
  const strategyOne = useSelector((store) => store.strategyOne);
  const {
    name,
    isEditing,
    editStrategyId,
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
  } = strategyOne;

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    dispatch(onChange({ name, value }));
  }

  function handleSubmit() {
    if (isEditing) {
      const { isEditing, editStrategyId, ...newState } = strategyOne;
      return dispatch(updateStrategy({ id: editStrategyId, state: newState }));
    }
    dispatch(addStrategy(strategyOne));
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
          strategy: 'strategyOne',
        }}
      />
      <AdvancedSettings
        {...{
          updateAdvancedSettings,
          strategy: 'strategyOne',
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
