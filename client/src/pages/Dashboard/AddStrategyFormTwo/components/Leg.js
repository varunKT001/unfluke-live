import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { indicatorOptions } from '../../../../utils/constants';
import { IndicatorParamsModal } from '../../../../components';
import {
  updateLeg,
  deleteLeg,
} from '../../../../redux/slices/strategyTwoSlice';
import { range } from '../../../../utils/miscUtils';
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
      return { name: `ITM (-${item} Strike}`, value: `ITM_${item}` };
    })
    .reverse(),
  { name: 'ATM (+0 Strike)', value: 'ATM_0' },
  ...range(1, 25, 1).map((item) => {
    return { name: `OTM (+${item} Strike)`, value: `OTM_${item}` };
  }),
];

export default function Leg(props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    if (
      name.split('.')[0] === 'quantity' ||
      (name.split('.')[0] === 'strikeDetails' &&
        props.strike === 'based_on_premium')
    ) {
      if (value < 0) {
        value = 0;
      }
    }

    const payload = {
      id: props._id || props.id,
      name,
      value,
    };
    dispatch(updateLeg(payload));
  }
  function handleBuySell() {
    const payload = {
      id: props._id || props.id,
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
      id: props._id || props.id,
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
      id: props._id || props.id,
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
    dispatch(deleteLeg(props._id || props.id));
  }

  return (
    <Stack
      direction='row'
      p={2}
      spacing={2}
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
        {/* //////////////// */}
        {/* //// STRIKE //// */}
        {/* //////////////// */}
        {props.segment === 'options' && (
          <FormControl size='small'>
            <Select name='strike' value={props.strike} onChange={handleChange}>
              <MenuItem value='based_on_atm'>Based on ATM</MenuItem>
              <MenuItem value='based_on_premium'>Based on premium</MenuItem>
            </Select>
          </FormControl>
        )}
        {/* //////////////////////// */}
        {/* //// STRIKE DETAILS //// */}
        {/* //////////////////////// */}
        {props.segment === 'options' && (
          <Stack
            sx={{
              width: '125px',
            }}
          >
            {props.strike === 'based_on_atm' ? (
              <FormControl size='small'>
                <Select
                  name='strikeDetails'
                  value={props.strikeDetails}
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
                value={props.strikeDetails}
                onChange={handleChange}
              />
            )}
          </Stack>
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
        <Stack spacing={2}>
          {edit === true &&
            props.conditions.map((condition, index) => {
              return (
                <Stack key={index} direction='row' spacing={2}>
                  {/* /////////////////// */}
                  {/* //// INDICATOR //// */}
                  {/* /////////////////// */}
                  <Stack direction='row' spacing={1}>
                    <FormControl size='small'>
                      <Select
                        name={`conditions.${index}.indicator_1.name`}
                        value={condition.indicator_1.name}
                        onChange={handleChange}
                      >
                        {indicatorOptions.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.value}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <IndicatorParamsModal
                      label='+'
                      indicator={{
                        type: 'indicator_1',
                        name: condition.indicator_1.name,
                        propertyName: `conditions.${index}.indicator_1.parameters`,
                        onSave: handleChange,
                      }}
                    />
                  </Stack>
                  {/* ////////////////// */}
                  {/* //// OPERATOR //// */}
                  {/* ////////////////// */}
                  <FormControl size='small'>
                    <Select
                      name={`conditions.${index}.operator`}
                      value={condition.operator}
                      onChange={handleChange}
                    >
                      <MenuItem value='greater_than'>
                        Greater than (&#62;)
                      </MenuItem>
                      <MenuItem value='greater_than_equal_to'>
                        Greater than, equal to (&#61;)
                      </MenuItem>
                      <MenuItem value='less_than'>Less than (&#60;)</MenuItem>
                      <MenuItem value='less_than_equal_to'>
                        Less than, equal to (&#61;)
                      </MenuItem>
                      <MenuItem value='cross_above_from_below'>
                        cross above from below
                      </MenuItem>
                      <MenuItem value='cross_below_from_above'>
                        cross below from above
                      </MenuItem>
                    </Select>
                  </FormControl>
                  {/* ///////////// */}
                  {/* //// RHS //// */}
                  {/* ///////////// */}
                  <FormControl size='small'>
                    <Select
                      name={`conditions.${index}.RHS`}
                      value={condition.RHS}
                      onChange={handleChange}
                    >
                      <MenuItem value='indicator'>Indicator</MenuItem>
                      <MenuItem value='number'>Number</MenuItem>
                      <MenuItem value='stock_ltp'>Stock LTP</MenuItem>
                    </Select>
                  </FormControl>
                  {/* /////////////////// */}
                  {/* //// INDICATOR //// */}
                  {/* /////////////////// */}
                  {condition.RHS === 'indicator' ? (
                    <Stack direction='row' spacing={1}>
                      <FormControl size='small'>
                        <Select
                          name={`conditions.${index}.indicator_2.name`}
                          value={condition.indicator_2.name}
                          onChange={handleChange}
                        >
                          {indicatorOptions.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.value}>
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                      <IndicatorParamsModal
                        label='parameters'
                        indicator={{
                          type: 'indicator_2',
                          name: condition.indicator_2.name,
                          propertyName: `conditions.${index}.indicator_2.parameters`,
                          onSave: handleChange,
                        }}
                      />
                    </Stack>
                  ) : (
                    condition.RHS === 'number' && (
                      <TextField
                        sx={{ width: '100px' }}
                        size='small'
                        type='number'
                        name={`conditions.${index}.RHSValue`}
                        value={condition.RHSValue || '0'}
                        onChange={handleChange}
                      />
                    )
                  )}
                </Stack>
              );
            })}
        </Stack>
        <Stack direction='row' spacing={2}>
          {/* ////////////////////// */}
          {/* //// INTSTRUMENTS //// */}
          {/* ////////////////////// */}
          <Stack spacing={1}>
            <Button
              variant='outlined'
              sx={{
                maxWidth: '100px',
                minWidth: '30px',
              }}
            >
              {props.instrument}
            </Button>
            {/* ////////////// */}
            {/* //// EDIT //// */}
            {/* ////////////// */}
            <Button
              variant={edit ? 'contained' : 'outlined'}
              onClick={() => setEdit(!edit)}
            >
              edit
            </Button>
          </Stack>
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
