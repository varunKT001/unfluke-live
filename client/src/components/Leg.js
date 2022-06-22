import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLeg, deleteLeg } from '../redux/slices/strategySlice';
import {
  range,
  toCamelCase,
  capitalizeFirstLetter,
  getUserInput,
} from '../utils';
import {
  Stack,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

const maxEntriesOptions = [
  { name: 'no_max_limit', value: 'No max limit' },
  ...range(1, 20, 1).map((item) => {
    return { name: item, value: item };
  }),
];

export default function Leg(props) {
  const dispatch = useDispatch();
  const { legOptions } = useSelector((store) => store.strategy.positions);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    if (name === 'legType.type' && value !== 'leg') {
      const payload = {
        id: props.id,
        name: 'legType.value',
        value: getUserInput(
          capitalizeFirstLetter(value.split('_').join(' ')),
          /^\d+$/,
          'Please input a number',
          0
        ),
      };
      dispatch(updateLeg(payload));
    }
    if (name === 'quantity') {
      if (value < 0) {
        value = 0;
      }
    }
    if (
      name.split('.')[0] === 'target' ||
      name.split('.')[0] === 'stopLoss' ||
      name.split('.')[0] === 'trailingStopLoss' ||
      name.split('.')[0] === 'waitTime' ||
      name.split('.')[0] === 'legType'
    ) {
      if (value < 0) {
        value = 0;
      }
    }
    const payload = {
      id: props.id,
      name,
      value,
    };
    dispatch(updateLeg(payload));
  }
  function handleBuySell() {
    const payload = {
      id: props.id,
      name: 'buysell',
      value: props.buysell,
    };
    if (props.buysell === 'buy') {
      payload.value = 'sell';
    } else {
      payload.value = 'buy';
    }
    dispatch(updateLeg(payload));
  }
  function handleTradeType() {
    const payload = {
      id: props.id,
      name: 'tradeType',
      value: props.tradeType,
    };
    if (props.tradeType === 'MIS') {
      payload.value = 'NRML';
    } else {
      payload.value = 'MIS';
    }
    dispatch(updateLeg(payload));
  }
  function handleOptions() {
    const payload = {
      id: props.id,
      name: 'options',
      value: props.options,
    };
    if (props.options === 'CE') {
      payload.value = 'PE';
    } else {
      payload.value = 'CE';
    }
    dispatch(updateLeg(payload));
  }
  function handleDelete() {
    dispatch(deleteLeg(props.id));
  }
  function handleInstrument() {
    const payload = {
      id: props.id,
      name: 'instrument',
      value: props.instrument,
    };
    if (props.instrument === 'banknifty') {
      payload.value = 'nifty';
    } else {
      payload.value = 'banknifty';
    }
    dispatch(updateLeg(payload));
  }

  return (
    <Stack
      direction='row'
      p={2}
      justifyContent='space-between'
      alignItems='center'
    >
      <Stack direction='row' spacing={1}>
        {/* ////////////////// */}
        {/* //// BUY/SELL //// */}
        {/* ////////////////// */}
        <Button
          variant='outlined'
          color='success'
          size='small'
          onClick={handleBuySell}
          sx={{
            maxWidth: '100px',
            minWidth: '30px',
          }}
        >
          {props.buysell}
        </Button>
        {/* //////////////////// */}
        {/* //// TRADE TYPE //// */}
        {/* //////////////////// */}
        <Button
          variant='outlined'
          color='info'
          size='small'
          onClick={handleTradeType}
          sx={{
            maxWidth: '100px',
            minWidth: '30px',
          }}
        >
          {props.tradeType}
        </Button>
        {/* ////////////////// */}
        {/* //// LEG TYPE //// */}
        {/* ////////////////// */}
        {props.segment === 'options' && (
          <FormControl size='small'>
            <Select
              name='legType.type'
              value={props.legType.type}
              onChange={handleChange}
            >
              <MenuItem value='leg'>Leg</MenuItem>
              <MenuItem value='premium_close_to'>Premium close to</MenuItem>
              <MenuItem value='premium_higher_than'>Premium &gt; than</MenuItem>
              <MenuItem value='premium_lower_than'>Premium &lt; than</MenuItem>
            </Select>
          </FormControl>
        )}
        {/* //////////////// */}
        {/* //// STRIKE //// */}
        {/* //////////////// */}
        {props.segment === 'options' && props.legType.type === 'leg' && (
          <FormControl size='small'>
            <Select name='strike' value={props.strike} onChange={handleChange}>
              {strikeOptions.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
        {/* /////////////////// */}
        {/* //// LEG VALUE //// */}
        {/* /////////////////// */}
        {props.segment === 'options' && props.legType.type !== 'leg' && (
          <TextField
            size='small'
            type='number'
            name='legType.value'
            value={props.legType.value}
            onChange={handleChange}
            sx={{ width: '65px' }}
          />
        )}
        {/* ///////////////// */}
        {/* //// OPTIONS //// */}
        {/* ///////////////// */}
        <Button
          variant='outlined'
          color='info'
          size='small'
          onClick={handleOptions}
          sx={{
            maxWidth: '100px',
            minWidth: '30px',
          }}
        >
          {props.options}
        </Button>
        {/* ////////////////// */}
        {/* //// QUANTITY //// */}
        {/* ////////////////// */}
        <Stack direction='row' spacing={1} alignItems='center'>
          <TextField
            size='small'
            type='number'
            name='quantity'
            value={props.quantity}
            onChange={handleChange}
            sx={{ width: '65px' }}
          />
          <Typography fontSize={18} color='grey.600'>
            ({props.quantity * (props.instrument === 'banknifty' ? 25 : 50)})
          </Typography>
        </Stack>
      </Stack>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Stack direction='row' spacing={2}>
          {/* /////////////////// */}
          {/* //// WAIT TIME //// */}
          {/* /////////////////// */}
          {legOptions.waitAndTrade && (
            <Stack spacing={1} width='100px'>
              <FormControl size='small'>
                <Select
                  name='waitTime.type'
                  value={props.waitTime.type}
                  onChange={handleChange}
                  sx={{ color: 'green' }}
                >
                  <MenuItem value='pts_up'>Pts &uarr;</MenuItem>
                  <MenuItem value='pts_down'>Pts &darr;</MenuItem>
                  <MenuItem value='%_up'>% &uarr;</MenuItem>
                  <MenuItem value='%_down'>% &darr;</MenuItem>
                  <MenuItem value='immediate'>Immediate</MenuItem>
                </Select>
              </FormControl>
              <TextField
                size='small'
                type='number'
                name='waitTime.value'
                value={props.waitTime.value}
                onChange={handleChange}
                sx={{ input: { color: 'green' } }}
                disabled={props.waitTime.type === 'immediate'}
              />
            </Stack>
          )}
          {/* //////////////// */}
          {/* //// TARGET //// */}
          {/* //////////////// */}
          <Stack spacing={1} width='85px'>
            <FormControl size='small'>
              <Select
                name='target.type'
                value={props.target.type}
                onChange={handleChange}
                sx={{ color: 'green' }}
              >
                <MenuItem value='TP: %'>TP: %</MenuItem>
                <MenuItem value='TP: pt'>TP: pt</MenuItem>
                <MenuItem value='None'>None</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size='small'
              type='number'
              name='target.value'
              value={props.target.value}
              onChange={handleChange}
              sx={{ input: { color: 'green' } }}
              disabled={props.target.type === 'None'}
            />
          </Stack>
          {/* /////////////////// */}
          {/* //// STOP LOSS //// */}
          {/* /////////////////// */}
          <Stack spacing={1} width='85px'>
            <FormControl size='small'>
              <Select
                name='stopLoss.type'
                value={props.stopLoss.type}
                onChange={handleChange}
                sx={{ color: 'red' }}
              >
                <MenuItem value='SL: %'>SL: %</MenuItem>
                <MenuItem value='SL: pt'>SL: pt</MenuItem>
                <MenuItem value='None'>None</MenuItem>
              </Select>
            </FormControl>
            <TextField
              size='small'
              type='number'
              name='stopLoss.value'
              value={props.stopLoss.value}
              onChange={handleChange}
              sx={{ input: { color: 'red' } }}
              disabled={props.stopLoss.type === 'None'}
            />
          </Stack>
          {/* //////////////////////////// */}
          {/* //// TRAILING STOP LOSS //// */}
          {/* //////////////////////////// */}
          <Stack spacing={1} width='125px'>
            <FormControl size='small' disabled={props.stopLoss.type === 'None'}>
              <Select
                name='trailingStopLoss.type'
                value={props.trailingStopLoss.type}
                onChange={handleChange}
                sx={{ color: 'orange' }}
              >
                <MenuItem value='TS: %'>TS: %</MenuItem>
                <MenuItem value='TS: pt'>TS: pt</MenuItem>
                <MenuItem value='None'>None</MenuItem>
              </Select>
            </FormControl>
            <Stack direction='row' spacing={1}>
              <TextField
                size='small'
                type='number'
                name='trailingStopLoss.value.x'
                value={props.trailingStopLoss.value.x}
                onChange={handleChange}
                sx={{ input: { color: 'orange' } }}
                disabled={props.stopLoss.type === 'None' ? true : false}
              />
              <TextField
                size='small'
                type='number'
                name='trailingStopLoss.value.y'
                value={props.trailingStopLoss.value.y}
                onChange={handleChange}
                sx={{ input: { color: 'orange' } }}
                disabled={props.stopLoss.type === 'None' ? true : false}
              />
            </Stack>
          </Stack>
          {/* ////////////////// */}
          {/* //// RE-ENTRY //// */}
          {/* ////////////////// */}
          {legOptions.reEntry && (
            <Stack spacing={1} width='125px'>
              <FormControl
                size='small'
                disabled={props.stopLoss.type === 'None'}
              >
                <Select
                  name='reEntrySetting.type'
                  value={props.reEntrySetting.type}
                  onChange={handleChange}
                  sx={{ color: 'purple' }}
                >
                  <MenuItem value='re_cost'>
                    Re-enter at cost (RE COST)
                  </MenuItem>
                  <MenuItem value='re_asap_reverse'>
                    Reverse positions and re-enter asap (RE ASAP REVERSE)
                  </MenuItem>
                  <MenuItem value='re_w_t'>
                    Re-entry with wait and trade (RE W&T)
                  </MenuItem>
                  <MenuItem value='re_w_t_reverse'>
                    Re-entry with wait and trade and reverse positions (RE W&T
                    REVERSE)
                  </MenuItem>
                  <MenuItem value='re_none'>Re-enter: None</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                size='small'
                disabled={props.reEntrySetting.type === 're_none'}
              >
                <Select
                  name='reEntrySetting.maxEntries'
                  value={props.reEntrySetting.maxEntries}
                  onChange={handleChange}
                  sx={{ color: 'purple' }}
                >
                  {maxEntriesOptions.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.name}>
                        {item.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Stack>
          )}
        </Stack>
        <Stack direction='row' spacing={1}>
          {/* //////////////////// */}
          {/* //// SQUARE OFF //// */}
          {/* //////////////////// */}
          <FormControl size='small'>
            <Select
              name='squareOff'
              value={props.squareOff}
              onChange={handleChange}
            >
              <MenuItem value='square_off_leg'>Square off leg</MenuItem>
              {!legOptions.waitAndTrade && (
                <MenuItem value='square_off_all'>Square off all</MenuItem>
              )}
            </Select>
          </FormControl>
          {/* ////////////////////// */}
          {/* //// INTSTRUMENTS //// */}
          {/* ////////////////////// */}
          <Button
            variant='outlined'
            onClick={handleInstrument}
            sx={{
              maxWidth: '100px',
              minWidth: '30px',
            }}
          >
            {props.instrument}
          </Button>
        </Stack>
        <Stack direction='row' spacing={2}>
          {/* //////////////// */}
          {/* //// DELETE //// */}
          {/* //////////////// */}
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
