import React, { useState } from 'react';
import { range, deepCopy } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addLeg } from '../../../redux/slices/strategyTwoSlice';
import LegsContainer from './LegsContainer';
import { v4 } from 'uuid';
import {
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
} from '@mui/material';

const initialPositions = {
  instrument: 'banknifty',
  segment: 'options',
  options: 'CE',
  buysell: 'buy',
  strike: 'ATM',
  strikeDetails: 'ATM',
  quantity: 1,
  timeFrame: '1',
  indicator_1: 'banknifty',
  operator: 'banknifty',
  RHS: 'banknifty',
  indicator_2: 'banknifty',
};

const strikeOptions = [
  ...range(1, 5, 1)
    .map((item) => {
      return { name: `ITM ${item}`, value: `ITM_${item}` };
    })
    .reverse(),
  { name: 'ATM', value: 'ATM' },
  ...range(1, 25, 1).map((item) => {
    return { name: `OTM ${item}`, value: `OTM_${item}` };
  }),
];

export default function Positions() {
  const dispatch = useDispatch();
  const { legs } = useSelector((store) => store.strategyTwo.positions);
  const [positions, setPositions] = useState(initialPositions);

  function handleinstrument(event) {
    const value = event.target.value;
    setPositions((prev) => {
      return { ...prev, instrument: value };
    });
  }
  function handleSegment(event) {
    const value = event.target.value;
    setPositions((prev) => {
      return { ...prev, segment: value };
    });
  }
  function handleOptions(event, value) {
    setPositions((prev) => {
      return { ...prev, options: value };
    });
  }
  function handleBuySell(event, value) {
    setPositions((prev) => {
      return { ...prev, buysell: value };
    });
  }
  function handleStrike(event) {
    const value = event.target.value;
    setPositions((prev) => {
      return { ...prev, strike: value };
    });
  }
  function handleStrikeDetails(event) {
    const value = event.target.value;
    setPositions((prev) => {
      return { ...prev, strikeDetails: value };
    });
  }
  function handleQuantity(event) {
    let value = event.target.value;
    if (value < 0) {
      value = 0;
    }
    setPositions((prev) => {
      return { ...prev, quantity: value };
    });
  }
  function handleTimeFrame(event) {
    let value = event.target.value;
    setPositions((prev) => {
      return { ...prev, timeFrame: value };
    });
  }
  function handleIndicator(event) {
    const name = event.target.name;
    let value = event.target.value;
    setPositions((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleOperator(event) {
    let value = event.target.value;
    setPositions((prev) => {
      return { ...prev, operator: value };
    });
  }
  function handleRHS(event) {
    let value = event.target.value;
    setPositions((prev) => {
      return { ...prev, RHS: value };
    });
  }
  function handleAddLeg() {
    let leg = deepCopy(positions);
    leg = {
      id: v4(),
      tradeType: 'MIS',
      legType: {
        type: leg.segment === 'options' ? 'leg' : 'futures',
        value: null,
      },
      ...leg,
    };
    dispatch(addLeg(leg));
  }

  return (
    <Stack spacing={4}>
      <Typography variant='button' color='grey.600'>
        positions
      </Typography>
      <Stack direction='row' spacing={4}>
        {/* //////////////////// */}
        {/* //// INSTRUMENT //// */}
        {/* //////////////////// */}
        <Stack spacing={1}>
          <Typography>Instrument</Typography>
          <FormControl size='small'>
            <Select
              name='instrument'
              value={positions.instrument}
              onChange={handleinstrument}
            >
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>Nifty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* ///////////////// */}
        {/* //// SEGMENT //// */}
        {/* ///////////////// */}
        <Stack spacing={1}>
          <Typography>Segment</Typography>
          <FormControl size='small'>
            <Select
              name='segment'
              value={positions.segment}
              onChange={handleSegment}
            >
              <MenuItem value='options'>Options</MenuItem>
              <MenuItem value='futures'>Futures</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* ///////////////// */}
        {/* //// OPTIONS //// */}
        {/* ///////////////// */}
        {positions.segment === 'options' && (
          <Stack spacing={1}>
            <Typography>Options</Typography>
            <ToggleButtonGroup
              size='small'
              color='primary'
              exclusive
              value={positions.options}
              onChange={handleOptions}
            >
              <ToggleButton value='CE'>CE</ToggleButton>
              <ToggleButton value='PE'>PE</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        )}
        {/* //////////////////// */}
        {/* //// BUY & SELL //// */}
        {/* //////////////////// */}
        <Stack spacing={1}>
          <Typography>Buy/Sell</Typography>
          <ToggleButtonGroup
            size='small'
            exclusive
            value={positions.buysell}
            onChange={handleBuySell}
          >
            <ToggleButton color='success' value='buy'>
              Buy
            </ToggleButton>
            <ToggleButton color='error' value='sell'>
              Sell
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {/* //////////////// */}
        {/* //// STRIKE //// */}
        {/* //////////////// */}
        {positions.segment === 'options' && (
          <Stack spacing={1}>
            <Typography>Strike</Typography>
            <FormControl size='small'>
              <Select
                name='strike'
                value={positions.strike}
                onChange={handleStrike}
              >
                {strikeOptions.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
        )}
        {/* //////////////////////// */}
        {/* //// STRIKE DETAILS //// */}
        {/* //////////////////////// */}
        {positions.segment === 'options' && (
          <Stack spacing={1}>
            <Typography>Strike Details</Typography>
            <FormControl size='small'>
              <Select
                name='strikeDetails'
                value={positions.strikeDetails}
                onChange={handleStrikeDetails}
              >
                {strikeOptions.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
        )}
        {/* ////////////////// */}
        {/* //// QUANTITY //// */}
        {/* ////////////////// */}
        <Stack
          spacing={1}
          sx={{
            width: '125px',
          }}
        >
          <Typography>Quantity (Lots)</Typography>
          <TextField
            size='small'
            type='number'
            name='quantity'
            value={positions.quantity}
            onChange={handleQuantity}
          />
        </Stack>
        {/* /////////////////// */}
        {/* //// TIMEFRAME //// */}
        {/* /////////////////// */}
        <Stack
          spacing={1}
          sx={{
            width: '125px',
          }}
        >
          <Typography>Timeframe</Typography>
          <FormControl size='small'>
            <Select
              name='timeFrame'
              value={positions.timeFrame}
              onChange={handleTimeFrame}
            >
              <MenuItem value='1'>1 min</MenuItem>
              <MenuItem value='2'>2 min</MenuItem>
              <MenuItem value='3'>3 min</MenuItem>
              <MenuItem value='4'>4 min</MenuItem>
              <MenuItem value='5'>5 min</MenuItem>
              <MenuItem value='15'>15 min</MenuItem>
              <MenuItem value='30'>30 min</MenuItem>
              <MenuItem value='60'>60 min</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Stack direction='row' spacing={4}>
        {/* /////////////////// */}
        {/* //// INDICATOR //// */}
        {/* /////////////////// */}
        <Stack spacing={1}>
          <Typography>Indicator</Typography>
          <FormControl size='small'>
            <Select
              name='indicator_1'
              value={positions.indicator_1}
              onChange={handleIndicator}
            >
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>Nifty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* ////////////////// */}
        {/* //// OPERATOR //// */}
        {/* ////////////////// */}
        <Stack spacing={1}>
          <Typography>Operator</Typography>
          <FormControl size='small'>
            <Select
              name='operator'
              value={positions.operator}
              onChange={handleOperator}
            >
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>Nifty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* ///////////// */}
        {/* //// RHS //// */}
        {/* ///////////// */}
        <Stack spacing={1}>
          <Typography>Type</Typography>
          <FormControl size='small'>
            <Select name='RHS' value={positions.RHS} onChange={handleRHS}>
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>Nifty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* /////////////////// */}
        {/* //// INDICATOR //// */}
        {/* /////////////////// */}
        <Stack spacing={1}>
          <Typography>Indicator</Typography>
          <FormControl size='small'>
            <Select
              name='indicator_2'
              value={positions.indicator_2}
              onChange={handleIndicator}
            >
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>Nifty</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* ///////////////// */}
        {/* //// ADD LEG //// */}
        {/* ///////////////// */}
        <Stack spacing={1} justifyContent='flex-end'>
          <Button variant='contained' onClick={handleAddLeg}>
            add leg
          </Button>
        </Stack>
      </Stack>
      {legs.length > 0 && <LegsContainer />}
    </Stack>
  );
}
