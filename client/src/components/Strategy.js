import React from 'react';
import { range } from '../utils/miscUtils';
import { useDispatch } from 'react-redux';
import { onChange } from '../redux/slices/strategyTwoSlice';
import {
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Slider,
} from '@mui/material';

const sliderMarks = [
  { value: 0, label: 0 },
  { value: 4, label: 4 },
];

export default function Strategy(props) {
  const dispatch = useDispatch();
  const {
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
  } = props;

  function handleUnderlying(event, value) {
    const e = { target: { name: 'strategySettings.underlying', value } };
    handleChange(e);
  }
  function handleTradeType(event, value) {
    const e = { target: { name: 'strategySettings.tradeType', value } };
    handleChange(e);
  }
  function handleWeekDays(event, value) {
    const e = { target: { name: 'strategySettings.weekDays', value } };
    handleChange(e);
  }
  function handleDaysBeforeExpiry(event, value) {
    const e = { target: { name: 'strategySettings.daysBeforeExpiry', value } };
    handleChange(e);
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
            name='strategySettings.underlying'
            value={underlying}
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
            name='strategySettings.tradeType'
            value={tradeType}
            onChange={handleTradeType}
          >
            <ToggleButton value='intraday'>Intraday</ToggleButton>
            <ToggleButton value='positional'>Positional</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {/* ////////////////// */}
        {/* //// DURATION //// */}
        {/* ////////////////// */}
        {tradeType === 'positional' && (
          <Stack spacing={1}>
            <Typography>Duration</Typography>
            <FormControl size='small'>
              <Select
                name='strategySettings.duration'
                value={duration}
                onChange={handleChange}
              >
                <MenuItem value='STBT_BTST'>STBT/BTST</MenuItem>
                <MenuItem value='N_days_before_expiry'>
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
            name='strategySettings.weekDays'
            value={weekDays}
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
                name='strategySettings.startTime.hour'
                value={startTime.hour}
                onChange={handleChange}
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
                name='strategySettings.startTime.minute'
                value={startTime.minute}
                onChange={handleChange}
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
                name='strategySettings.startTime.second'
                value={startTime.second}
                onChange={handleChange}
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
        {/* //////////////////////////// */}
        {/* //// DAYS BEFORE EXPIRY //// */}
        {/* //////////////////////////// */}
        {tradeType === 'positional' && duration === 'N_days_before_expiry' && (
          <Stack spacing={1}>
            <Typography>End day</Typography>
            <Slider
              name='strategySettings.daysBeforeExpiry'
              defaultValue={4}
              value={Number(daysBeforeExpiry)}
              min={0}
              max={4}
              step={1}
              marks={sliderMarks}
              valueLabelDisplay='auto'
              onChange={handleDaysBeforeExpiry}
            />
          </Stack>
        )}
        {/* ////////////////// */}
        {/* //// END TIME //// */}
        {/* ////////////////// */}
        {(tradeType === 'intraday' ||
          (tradeType === 'positional' &&
            duration === 'N_days_before_expiry')) && (
          <Stack spacing={1}>
            <Typography>End time</Typography>
            <Stack direction='row' spacing={1}>
              <FormControl size='small'>
                <Select
                  name='strategySettings.endTime.hour'
                  value={endTime.hour}
                  onChange={handleChange}
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
                  name='strategySettings.endTime.minute'
                  value={endTime.minute}
                  onChange={handleChange}
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
                  name='strategySettings.endTime.second'
                  value={endTime.second}
                  onChange={handleChange}
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
        {tradeType === 'positional' && duration === 'STBT_BTST' && (
          <Stack spacing={1}>
            <Typography>Next day end time</Typography>
            <Stack direction='row' spacing={1}>
              <FormControl size='small'>
                <Select
                  name='strategySettings.nextDayEndTime.hour'
                  value={nextDayEndTime.hour}
                  onChange={handleChange}
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
                  name='strategySettings.nextDayEndTime.minute'
                  value={nextDayEndTime.minute}
                  onChange={handleChange}
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
                  name='strategySettings.nextDayEndTime.second'
                  value={nextDayEndTime.second}
                  onChange={handleChange}
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
        {tradeType === 'positional' && (
          <Stack spacing={1}>
            <Typography>Check condition next day after (time)</Typography>
            <Stack direction='row' spacing={1}>
              <FormControl size='small'>
                <Select
                  name='strategySettings.checkConditionNextDayAfter.hour'
                  value={checkConditionNextDayAfter.hour}
                  onChange={handleChange}
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
                  name='strategySettings.checkConditionNextDayAfter.minute'
                  value={checkConditionNextDayAfter.minute}
                  onChange={handleChange}
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
                  name='strategySettings.checkConditionNextDayAfter.second'
                  value={checkConditionNextDayAfter.second}
                  onChange={handleChange}
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
