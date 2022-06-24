import React, { useEffect, useState } from 'react';
import { Stack, TextField, Divider, Button } from '@mui/material';
import { Positions } from './components';
import { MTM, Strategy, AdvancedSettings } from '../../components';
import { deepCopy } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveStrategyName,
  saveStrategySettings,
  updateMTMTarget,
  updateMTMStopLoss,
  updateMTMTrailing,
  deleteStateProp,
  updateAdvancedSettings,
} from '../../redux/slices/strategyTwoSlice';

const initialStrategy = {
  underlying: 'spot',
  tradeType: 'intraday',
  weekDays: ['monday', 'wednessday', 'friday'],
  duration: 'STBT_BTST',
  startTime: {
    hour: 9,
    minute: 15,
    second: 0,
  },
  endTime: {
    hour: 9,
    minute: 15,
    second: 0,
  },
  nextDayEndTime: {
    hour: 9,
    minute: 15,
    second: 0,
  },
  checkConditionNextDayAfter: {
    hour: 9,
    minute: 15,
    second: 0,
  },
  daysBeforeExpiry: 4,
};

export default function AddStrategyFormTwo() {
  const dispatch = useDispatch();
  const { name } = useSelector((store) => store.strategyTwo);
  const [strategyName, setStrategyName] = useState(name);
  const [strategy, setStrategy] = useState(initialStrategy);

  function handleStrategyName(event) {
    const value = event.target.value;
    setStrategyName(value);
  }
  function handleUnderlying(event, value) {
    setStrategy((prev) => {
      return { ...prev, underlying: value };
    });
  }
  function handleTradeType(event, value) {
    setStrategy((prev) => {
      return { ...prev, tradeType: value };
    });
  }
  function handleWeekDays(event, value) {
    setStrategy((prev) => {
      return { ...prev, weekDays: value };
    });
  }
  function handleDuration(event) {
    const value = event.target.value;
    setStrategy((prev) => {
      return { ...prev, duration: value };
    });
  }
  function handleStartTime(event) {
    const name = event.target.name;
    const value = event.target.value;
    setStrategy((prev) => {
      return { ...prev, startTime: { ...prev.startTime, [name]: value } };
    });
  }
  function handleEndTime(event) {
    const name = event.target.name;
    const value = event.target.value;
    setStrategy((prev) => {
      return { ...prev, endTime: { ...prev.endTime, [name]: value } };
    });
  }
  function handleNextDayEndTime(event) {
    const name = event.target.name;
    const value = event.target.value;
    setStrategy((prev) => {
      return {
        ...prev,
        nextDayEndTime: { ...prev.nextDayEndTime, [name]: value },
      };
    });
  }
  function handleCheckConditionNextDayAfter(event) {
    const name = event.target.name;
    const value = event.target.value;
    setStrategy((prev) => {
      return {
        ...prev,
        checkConditionNextDayAfter: {
          ...prev.checkConditionNextDayAfter,
          [name]: value,
        },
      };
    });
  }
  function handleDaysBeforeExpiry(event) {
    const value = event.target.value;
    setStrategy((prev) => {
      return { ...prev, daysBeforeExpiry: value };
    });
  }
  function handleSaveSettings() {
    const strategySettings = deepCopy(strategy);
    if (strategySettings.tradeType === 'intraday') {
      delete strategySettings.duration;
      delete strategySettings.daysBeforeExpiry;
      delete strategySettings.nextDayEndTime;
      delete strategySettings.checkConditionNextDayAfter;
    } else if (
      strategySettings.tradeType === 'positional' &&
      strategySettings.duration === 'STBT/BTST'
    ) {
      delete strategySettings.endTime;
      delete strategySettings.daysBeforeExpiry;
    } else if (
      strategySettings.tradeType === 'positional' &&
      strategySettings.duration === '(N) days before expiry'
    ) {
      delete strategySettings.nextDayEndTime;
    }
    dispatch(saveStrategySettings(strategySettings));
    dispatch(saveStrategyName(strategyName));
  }

  useEffect(() => {
    handleSaveSettings();
    // eslint-disable-next-line
  }, [strategyName, strategy]);

  return (
    <Stack spacing={4} divider={<Divider orientation='horizontal' flexItem />}>
      <TextField
        label='Strategy Name'
        value={strategyName}
        variant='standard'
        onChange={handleStrategyName}
      />
      <Strategy
        {...{
          strategy,
          handleUnderlying,
          handleTradeType,
          handleWeekDays,
          handleDuration,
          handleStartTime,
          handleEndTime,
          handleNextDayEndTime,
          handleCheckConditionNextDayAfter,
          handleDaysBeforeExpiry,
        }}
      />
      <Positions />
      <MTM
        {...{
          updateMTMTarget,
          updateMTMStopLoss,
          updateMTMTrailing,
          deleteStateProp,
          strategy: 'strategyTwo',
        }}
      />
      <AdvancedSettings
        {...{
          updateAdvancedSettings,
          deleteStateProp,
          strategy: 'strategyTwo',
        }}
      />
      <Button variant='contained' sx={{ width: 'fit-content' }}>
        Save settings
      </Button>
    </Stack>
  );
}