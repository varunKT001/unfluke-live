import React, { useState, useEffect } from 'react';
import { range, deepCopy } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLeg,
  changeLegOptions,
} from '../../../redux/slices/strategyOneSlice';
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
  Checkbox,
  FormControlLabel,
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
  legOptions: {
    waitAndTrade: false,
    reEntry: false,
    moveSlToCost: false,
    tradeOnlyFirstEntry: false,
  },
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
  const { legs } = useSelector((store) => store.strategyOne.positions);
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
  function handleWaitAndTrade(event) {
    const value = event.target.checked;
    setPositions((prev) => {
      return {
        ...prev,
        legOptions: {
          ...prev.legOptions,
          waitAndTrade: value,
          tradeOnlyFirstEntry: value
            ? prev.legOptions.tradeOnlyFirstEntry
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
        legOptions: { ...prev.legOptions, reEntry: value },
      };
    });
  }
  function handleMoveSlToCost(event) {
    const value = event.target.checked;
    setPositions((prev) => {
      return {
        ...prev,
        legOptions: { ...prev.legOptions, moveSlToCost: value },
      };
    });
  }
  function handleTradeOnlyFirstEntry(event) {
    const value = event.target.checked;
    setPositions((prev) => {
      return {
        ...prev,
        legOptions: { ...prev.legOptions, tradeOnlyFirstEntry: value },
      };
    });
  }
  function handleAddLeg() {
    let leg = deepCopy(positions);
    leg = {
      ...leg,
      id: v4(),
      tradeType: 'MIS',
      target: {
        type: 'None',
        value: 0,
      },
      stopLoss: {
        type: 'None',
        value: 0,
      },
      trailingStopLoss: {
        type: 'None',
        value: {
          x: 0,
          y: 0,
        },
      },
      squareOff: 'square_off_leg',
      legType: {
        type: leg.segment === 'options' ? 'leg' : 'futures',
        value: null,
      },
    };
    if (leg.legOptions.waitAndTrade) {
      leg.waitTime = { type: 'immediate', value: 0 };
    }
    if (leg.legOptions.reEntry) {
      leg.reEntrySetting = { type: 're_none', maxEntries: 'no_max_limit' };
    }
    delete leg.legOptions;
    if (leg.segment === 'futures') {
      delete leg.options;
      delete leg.strike;
    }
    dispatch(addLeg(leg));
  }

  useEffect(() => {
    const legOptions = deepCopy(positions.legOptions);
    dispatch(changeLegOptions(legOptions));
    // eslint-disable-next-line
  }, [
    positions.legOptions.waitAndTrade,
    positions.legOptions.moveSlToCost,
    positions.legOptions.tradeOnlyFirstEntry,
    positions.legOptions.reEntry,
  ]);

  return (
    <Stack spacing={4}>
      <Typography variant='button' color='grey.600'>
        positions
      </Typography>
      <Stack direction='row' spacing={2}>
        {/* //////////////////// */}
        {/* //// instrument //// */}
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
        {/* ////////////////////// */}
        {/* //// WAIT & TRADE //// */}
        {/* ////////////////////// */}
        <Stack spacing={1} justifyContent='flex-end'>
          <FormControlLabel
            control={
              <Checkbox
                checked={positions.legOptions.waitAndTrade}
                onChange={handleWaitAndTrade}
              />
            }
            label='Wait & Trade'
          />
        </Stack>
        {/* //////////////////////////////// */}
        {/* //// TRADE ONLY FIRST ENTRY //// */}
        {/* //////////////////////////////// */}
        {positions.legOptions.waitAndTrade && (
          <Stack spacing={1} justifyContent='flex-end'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={positions.legOptions.tradeOnlyFirstEntry}
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
                checked={positions.legOptions.reEntry}
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
      {legs.length > 0 && <LegsContainer />}
      <Stack direction='row' spacing={4}>
        <Stack spacing={1} justifyContent='flex-end'>
          <FormControlLabel
            control={
              <Checkbox
                checked={positions.legOptions.moveSlToCost}
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
