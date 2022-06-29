import React from 'react';
import { useDispatch } from 'react-redux';
import {
  updateLeg,
  deleteLeg,
} from '../../../../redux/slices/strategyTwoSlice';
import {
  range,
  capitalizeFirstLetter,
  getUserInput,
} from '../../../../utils/miscUtils';
import {
  Stack,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
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
    if (name.split('.')[0] === 'legType') {
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
          color={props.buysell === 'buy' ? 'success' : 'error'}
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
        {props.segment === 'options' ? (
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
        ) : (
          <Button
            variant='outlined'
            color='info'
            size='small'
            sx={{
              maxWidth: '100px',
              minWidth: '30px',
            }}
          >
            FT
          </Button>
        )}
        {/* /////////////////// */}
        {/* //// TIMEFRAME //// */}
        {/* /////////////////// */}
        <FormControl size='small'>
          <Select
            name='timeFrame'
            value={props.timeFrame}
            onChange={handleChange}
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
            sx={{ width: '85px' }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>x</InputAdornment>,
            }}
          />
          <Typography fontSize={18} color='grey.600'>
            ({props.quantity * (props.instrument === 'banknifty' ? 25 : 50)})
          </Typography>
        </Stack>
      </Stack>
      <Stack direction='row' spacing={2} alignItems='center'>
        <Stack direction='row' spacing={2}>
          {/* /////////////////// */}
          {/* //// INDICATOR //// */}
          {/* /////////////////// */}
          <FormControl size='small'>
            <Select
              name='indicator_1'
              value={props.indicator_1}
              onChange={handleChange}
            >
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>nifty</MenuItem>
            </Select>
          </FormControl>
          {/* ////////////////// */}
          {/* //// OPERATOR //// */}
          {/* ////////////////// */}
          <FormControl size='small'>
            <Select
              name='operator'
              value={props.operator}
              onChange={handleChange}
            >
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>nifty</MenuItem>
            </Select>
          </FormControl>
          {/* ///////////// */}
          {/* //// RHS //// */}
          {/* ///////////// */}
          <FormControl size='small'>
            <Select name='RHS' value={props.RHS} onChange={handleChange}>
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>nifty</MenuItem>
            </Select>
          </FormControl>
          {/* /////////////////// */}
          {/* //// INDICATOR //// */}
          {/* /////////////////// */}
          <FormControl size='small'>
            <Select
              name='indicator_2'
              value={props.indicator_2}
              onChange={handleChange}
            >
              <MenuItem value='banknifty'>Banknifty</MenuItem>
              <MenuItem value='nifty'>nifty</MenuItem>
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
