import React, { useState, useEffect } from 'react';
import {
  range,
  deepCopy,
  setDeepObjProp as set,
} from '../../../../utils/miscUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLeg,
  changeLegOptions,
} from '../../../../redux/slices/strategyOneSlice';
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
import Axios from 'axios';

const initialPositions = {
  instrument: 'NIFTY',
  segment: 'options',
  options: 'CE',
  buysell: 'buy',
  strike: 'based_on_atm',
  strikeDetails: 'ATM_0',
  quantity: 1,
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
  waitTime: {
    type: 'immediate',
    value: 0,
  },
  legOptions: {
    waitAndTrade: false,
    moveSlToCost: false,
  },
};

const strikeOptions = [
  ...range(1, 5, 1)
    .map((item) => {
      return { name: `ITM (-${item} Strike}`, value: `ITM_${item}` };
    })
    .reverse(),
  { name: 'ATM (+0 Strike)', value: 'ATM_0' },
  ...range(1, 25, 1).map((item) => {
    return { name: `OTM (+${item} Strike)`, value: `OTM_${item}` };
  }),
];

export default function Positions() {
  const dispatch = useDispatch();
  const { legs, legOptions } = useSelector(
    (store) => store.strategyOne.positions
  );
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [positions, setPositions] = useState({
    ...initialPositions,
    legOptions: { ...legOptions },
  });

  async function fetchInstrumentOptions() {
    try {
      const resp = await Axios('/strategy/instruments');
      setInstrumentOptions([...resp.data.data]);
      setPositions((prev) => {
        return { ...prev, instrument: resp.data.data[0] };
      });
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    setPositions((prev) => {
      set(prev, name.split('.'), value);
      return { ...prev };
    });
  }
  function handleCheckBox(event) {
    const name = event.target.name;
    let value = event.target.checked;
    setPositions((prev) => {
      set(prev, name.split('.'), value);
      return { ...prev };
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
  function handleAddLeg() {
    let leg = deepCopy(positions);
    leg = { id: v4(), ...leg };
    delete leg.legOptions;
    dispatch(addLeg(leg));
  }

  useEffect(() => {
    dispatch(changeLegOptions(positions.legOptions));
    // eslint-disable-next-line
  }, [
    positions.legOptions.waitAndTrade,
    positions.legOptions.moveSlToCost,
    positions.legOptions.tradeOnlyFirstEntry,
    positions.legOptions.reEntry,
  ]);

  useEffect(() => {
    fetchInstrumentOptions();
  }, []);

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
              onChange={handleChange}
            >
              {instrumentOptions.map((item, index) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
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
              onChange={handleChange}
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
                onChange={handleChange}
              >
                <MenuItem value='based_on_atm'>Based on ATM</MenuItem>
                <MenuItem value='based_on_premium'>Based on premium</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
        {/* //////////////////////// */}
        {/* //// STRIKE DETAILS //// */}
        {/* //////////////////////// */}
        {positions.segment === 'options' && (
          <Stack
            spacing={1}
            sx={{
              width: '125px',
            }}
          >
            <Typography>Strike Details</Typography>
            {positions.strike === 'based_on_atm' ? (
              <FormControl size='small'>
                <Select
                  name='strikeDetails'
                  value={positions.strikeDetails}
                  onChange={handleChange}
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
            ) : (
              <TextField
                size='small'
                type='number'
                name='strikeDetails'
                value={positions.strikeDetails}
                onChange={handleChange}
              />
            )}
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
            onChange={handleChange}
          />
        </Stack>
        {/* ////////////////////// */}
        {/* //// WAIT & TRADE //// */}
        {/* ////////////////////// */}
        <Stack spacing={1} justifyContent='flex-end'>
          <FormControlLabel
            control={
              <Checkbox
                name='legOptions.waitAndTrade'
                checked={positions.legOptions.waitAndTrade}
                onChange={handleCheckBox}
              />
            }
            label='Wait & Trade'
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
                name='legOptions.moveSlToCost'
                checked={positions.legOptions.moveSlToCost}
                onChange={handleCheckBox}
              />
            }
            label='Move SL to Cost'
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
