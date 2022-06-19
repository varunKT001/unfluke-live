import React, { useState, useEffect } from 'react';
import { range, deepCopy } from '../utils';
import { useDispatch } from 'react-redux';
import { addLeg, changeLegOptions } from '../redux/slices/strategySlice';
import {
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';

const initialPositions = {
  instruments: 'banknifty',
  segment: 'options',
  options: 'CE',
  buysell: 'buy',
  strike: 'ATM',
  quantity: 1,
  legsOptions: {
    waitAndTrade: false,
    reEntry: false,
    moveSlToCost: false,
    tradeOnlyFirstEntry: false,
  },
};

const strikeOptions = [
  ...range(1, 5, 1)
    .map((item) => `ITM ${item}`)
    .reverse(),
  'ATM',
  ...range(1, 25, 1).map((item) => `OTM ${item}`),
];

export default function Positions() {
  const dispatch = useDispatch();
  const [positions, setPositions] = useState(initialPositions);

  function handleInstruments(event) {
    const value = event.target.value;
    setPositions((prev) => {
      return { ...prev, instruments: value };
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
  function handleQuantity(event) {
    const value = event.target.value;
    if (value < 0) {
      value = 0;
    }
    setPositions((prev) => {
      return { ...prev, quantity: value };
    });
  }
  function handleWaitAndTrade(event) {
    const value = event.target.checked;
    setPositions((prev) => {
      return {
        ...prev,
        legsOptions: {
          ...prev.legsOptions,
          waitAndTrade: value,
          tradeOnlyFirstEntry: value
            ? prev.legsOptions.tradeOnlyFirstEntry
            : false,
        },
      };
    });
  }
  function handleReEntry(event) {
    const value = event.target.checked;
    setPositions((prev) => {
      return {
        ...prev,
        legsOptions: { ...prev.legsOptions, reEntry: value },
      };
    });
  }
  function handleMoveSlToCost(event) {
    const value = event.target.checked;
    setPositions((prev) => {
      return {
        ...prev,
        legsOptions: { ...prev.legsOptions, moveSlToCost: value },
      };
    });
  }
  function handleTradeOnlyFirstEntry(event) {
    const value = event.target.checked;
    setPositions((prev) => {
      return {
        ...prev,
        legsOptions: { ...prev.legsOptions, tradeOnlyFirstEntry: value },
      };
    });
  }
  function handleAddLeg() {
    const leg = deepCopy(positions);
    if (leg.segment === 'futures') {
      delete leg.options;
      delete leg.strike;
    }
    delete leg.legsOptions;
    dispatch(addLeg(leg));
  }

  useEffect(() => {
    const legsOptions = deepCopy(positions.legsOptions);
    dispatch(changeLegOptions(legsOptions));
  }, [
    positions.legsOptions.waitAndTrade,
    positions.legsOptions.moveSlToCost,
    positions.legsOptions.tradeOnlyFirstEntry,
    positions.legsOptions.reEntry,
  ]);

  return (
    <Stack spacing={4}>
      <Typography variant='button' color='grey.600'>
        positions
      </Typography>
      <Stack direction='row' spacing={4}>
        {/* ///////////////////// */}
        {/* //// INSTRUMENTS //// */}
        {/* ///////////////////// */}
        <Stack spacing={1}>
          <Typography>Instruments</Typography>
          <FormControl size='small'>
            <Select
              name='instruments'
              value={positions.instruments}
              onChange={handleInstruments}
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
            color='primary'
            exclusive
            value={positions.buysell}
            onChange={handleBuySell}
          >
            <ToggleButton value='buy'>Buy</ToggleButton>
            <ToggleButton value='sell'>Sell</ToggleButton>
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
                    <MenuItem key={index} value={item}>
                      {item}
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
            value={positions.quantity}
            onChange={handleQuantity}
          />
        </Stack>
        {/* ////////////////////// */}
        {/* //// WAIT & TRADE //// */}
        {/* ////////////////////// */}
        <Stack spacing={1} justifyContent='flex-end'>
          <FormControlLabel
            control={
              <Checkbox
                checked={positions.legsOptions.waitAndTrade}
                onChange={handleWaitAndTrade}
              />
            }
            label='Wait & Trade'
          />
        </Stack>
        {/* //////////////////////////////// */}
        {/* //// TRADE ONLY FIRST ENTRY //// */}
        {/* //////////////////////////////// */}
        {positions.legsOptions.waitAndTrade && (
          <Stack spacing={1} justifyContent='flex-end'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={positions.legsOptions.tradeOnlyFirstEntry}
                  onChange={handleTradeOnlyFirstEntry}
                />
              }
              label='Trade only first entry'
            />
          </Stack>
        )}

        {/* ////////////////// */}
        {/* //// RE-ENTRY //// */}
        {/* ////////////////// */}
        <Stack spacing={1} justifyContent='flex-end'>
          <FormControlLabel
            control={
              <Checkbox
                checked={positions.legsOptions.reEntry}
                onChange={handleReEntry}
              />
            }
            label='Re-entry'
          />
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
      <Stack direction='row' spacing={4}>
        <Stack spacing={1} justifyContent='flex-end'>
          <FormControlLabel
            control={
              <Checkbox
                checked={positions.legsOptions.moveSlToCost}
                onChange={handleMoveSlToCost}
              />
            }
            label='Move SL to Cost'
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
