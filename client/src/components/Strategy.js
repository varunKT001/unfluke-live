import React, { useState } from 'react';
import range from '../utils/range';
import {
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

const initialStrategy = {
  underlying: 'spot',
  tradeType: 'intraday',
  weekDays: ['monday', 'wednessday', 'friday'],
  duration: 'STBT/BTST',
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
};

export default function Strategy() {
  const [strategy, setStrategy] = useState(initialStrategy);

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

  return (
    <Stack spacing={4}>
      <Stack direction='row' spacing={4}>
        {/* //////////////////// */}
        {/* //// UNDERLYING //// */}
        {/* //////////////////// */}
        <Stack spacing={1}>
          <Typography>Underlying</Typography>
          <ToggleButtonGroup
            size='small'
            color='primary'
            exclusive
            value={strategy.underlying}
            onChange={handleUnderlying}
          >
            <ToggleButton value='spot'>Spot</ToggleButton>
            <ToggleButton value='future'>Future</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {/* //////////////////// */}
        {/* //// TRADE TYPE //// */}
        {/* //////////////////// */}
        <Stack spacing={1}>
          <Typography>Trade type</Typography>
          <ToggleButtonGroup
            size='small'
            color='primary'
            exclusive
            value={strategy.tradeType}
            onChange={handleTradeType}
          >
            <ToggleButton value='intraday'>Intraday</ToggleButton>
            <ToggleButton value='positional'>Positional</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {/* ////////////////// */}
        {/* //// DURATION //// */}
        {/* ////////////////// */}
        {strategy.tradeType === 'positional' && (
          <Stack spacing={1}>
            <Typography>Duration</Typography>
            <FormControl size='small'>
              <Select
                name='duration'
                value={strategy.duration}
                onChange={handleDuration}
              >
                <MenuItem value='STBT/BTST'>STBT/BTST</MenuItem>
                <MenuItem value='(N) days before expiry'>
                  (N) days before expiry
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
        {/* /////////////////// */}
        {/* //// WEEK DAYS //// */}
        {/* /////////////////// */}
        <Stack spacing={1}>
          <Typography>Week days</Typography>
          <ToggleButtonGroup
            size='small'
            color='primary'
            value={strategy.weekDays}
            onChange={handleWeekDays}
          >
            <ToggleButton value='monday'>mon</ToggleButton>
            <ToggleButton value='tuesday'>tues</ToggleButton>
            <ToggleButton value='wednessday'>wed</ToggleButton>
            <ToggleButton value='thursday'>thurs</ToggleButton>
            <ToggleButton value='friday'>fri</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
      <Stack direction='row' spacing={4}>
        {/* //////////////////// */}
        {/* //// START TIME //// */}
        {/* //////////////////// */}
        <Stack spacing={1}>
          <Typography>Start time</Typography>
          <Stack direction='row' spacing={1}>
            <FormControl size='small'>
              <Select
                name='hour'
                value={strategy.startTime.hour}
                onChange={handleStartTime}
              >
                {range(9, 15, 1).map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>HH</FormHelperText>
            </FormControl>
            <FormControl size='small'>
              <Select
                name='minute'
                value={strategy.startTime.minute}
                onChange={handleStartTime}
              >
                {range(0, 59, 1).map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>MM</FormHelperText>
            </FormControl>
            <FormControl size='small'>
              <Select
                name='second'
                value={strategy.startTime.second}
                onChange={handleStartTime}
              >
                {range(0, 59, 1).map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>SS</FormHelperText>
            </FormControl>
          </Stack>
        </Stack>
        {/* ////////////////// */}
        {/* //// END TIME //// */}
        {/* ////////////////// */}
        {strategy.tradeType === 'intraday' && (
          <Stack spacing={1}>
            <Typography>End time</Typography>
            <Stack direction='row' spacing={1}>
              <FormControl size='small'>
                <Select
                  name='hour'
                  value={strategy.endTime.hour}
                  onChange={handleEndTime}
                >
                  {range(9, 15, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>HH</FormHelperText>
              </FormControl>
              <FormControl size='small'>
                <Select
                  name='minute'
                  value={strategy.endTime.minute}
                  onChange={handleEndTime}
                >
                  {range(0, 59, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>MM</FormHelperText>
              </FormControl>
              <FormControl size='small'>
                <Select
                  name='second'
                  value={strategy.endTime.second}
                  onChange={handleEndTime}
                >
                  {range(0, 59, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>SS</FormHelperText>
              </FormControl>
            </Stack>
          </Stack>
        )}
        {/* /////////////////////////// */}
        {/* //// NEXT DAY END TIME //// */}
        {/* /////////////////////////// */}
        {strategy.tradeType === 'positional' && (
          <Stack spacing={1}>
            <Typography>Next day end time</Typography>
            <Stack direction='row' spacing={1}>
              <FormControl size='small'>
                <Select
                  name='hour'
                  value={strategy.nextDayEndTime.hour}
                  onChange={handleNextDayEndTime}
                >
                  {range(9, 15, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>HH</FormHelperText>
              </FormControl>
              <FormControl size='small'>
                <Select
                  name='minute'
                  value={strategy.nextDayEndTime.minute}
                  onChange={handleNextDayEndTime}
                >
                  {range(0, 59, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>MM</FormHelperText>
              </FormControl>
              <FormControl size='small'>
                <Select
                  name='second'
                  value={strategy.nextDayEndTime.second}
                  onChange={handleNextDayEndTime}
                >
                  {range(0, 59, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>SS</FormHelperText>
              </FormControl>
            </Stack>
          </Stack>
        )}
        {/* ///////////////////////////////////////////// */}
        {/* //// CHECK CONDITION NEXT DAY AFTER TIME //// */}
        {/* ///////////////////////////////////////////// */}
        {strategy.tradeType === 'positional' && (
          <Stack spacing={1}>
            <Typography>Check condition next day after (time)</Typography>
            <Stack direction='row' spacing={1}>
              <FormControl size='small'>
                <Select
                  name='hour'
                  value={strategy.checkConditionNextDayAfter.hour}
                  onChange={handleCheckConditionNextDayAfter}
                >
                  {range(9, 15, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>HH</FormHelperText>
              </FormControl>
              <FormControl size='small'>
                <Select
                  name='minute'
                  value={strategy.checkConditionNextDayAfter.minute}
                  onChange={handleCheckConditionNextDayAfter}
                >
                  {range(0, 59, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>MM</FormHelperText>
              </FormControl>
              <FormControl size='small'>
                <Select
                  name='second'
                  value={strategy.checkConditionNextDayAfter.second}
                  onChange={handleCheckConditionNextDayAfter}
                >
                  {range(0, 59, 1).map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>SS</FormHelperText>
              </FormControl>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
