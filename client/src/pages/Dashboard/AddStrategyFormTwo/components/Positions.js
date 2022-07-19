import React, { useState, useEffect } from 'react';
import {
  range,
  deepCopy,
  setDeepObjProp as set,
} from '../../../../utils/miscUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLeg,
  changeLegSegment,
} from '../../../../redux/slices/strategyTwoSlice';
import LegsContainer from './LegsContainer';
import { IndicatorParamsModal } from '../../../../components';
import { v4 } from 'uuid';
import { indicatorOptions } from '../../../../utils/constants';
import DeleteIcon from '@mui/icons-material/Delete';
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
  IconButton,
} from '@mui/material';
import Axios from 'axios';

const initialPositions = {
  instrument: { option: 'NIFTY', multiple: 50 },
  segment: 'options',
  options: 'CE',
  buysell: 'buy',
  strike: 'based_on_atm',
  strikeDetails: 'ATM_0',
  quantity: 1,
  tradeType: 'MIS',
  timeFrame: '1',
  conditions: [
    {
      indicator_1: { name: 'sma', parameters: {} },
      operator: 'greater_than',
      RHS: 'indicator',
      indicator_2: { name: 'sma', parameters: {} },
    },
  ],
};

const initialCondition = {
  indicator_1: { name: 'sma', parameters: {} },
  operator: 'greater_than',
  RHS: 'indicator',
  indicator_2: { name: 'sma', parameters: {} },
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
  const { legs } = useSelector((store) => store.strategyTwo.positions);
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [positions, setPositions] = useState(() => initialPositions);

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
  function handleAndOr(event, index) {
    const name = event.target.dataset.name;
    const propName = `conditions.${index}.logic`;
    if (positions.conditions[index].logic) {
      setPositions((prev) => {
        set(prev, propName.split('.'), name);
        return { ...prev };
      });
    } else {
      setPositions((prev) => {
        set(prev, propName.split('.'), name);
        return {
          ...prev,
          conditions: [...prev.conditions, deepCopy(initialCondition)],
        };
      });
    }
  }
  function handleDeleteRow(indexToBeDeleted) {
    setPositions((prev) => {
      const newConditions = prev.conditions.filter(
        (item, index) => index !== indexToBeDeleted
      );
      delete newConditions[newConditions.length - 1].logic;
      return { ...prev, conditions: [...newConditions] };
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
  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'segment') {
      dispatch(changeLegSegment(value));
    }

    if (name === 'quantity' && parseInt(value) < 0) {
      value = 0;
    }

    if (
      name === 'strikeDetails' &&
      positions.strike === 'based_on_premium' &&
      parseFloat(value) < 0
    ) {
      value = 0.0;
    }

    setPositions((prev) => {
      set(prev, name.split('.'), value);
      return { ...prev };
    });
  }
  function handleAddLeg() {
    let leg = deepCopy(positions);
    leg = { id: v4(), ...leg };
    dispatch(addLeg(leg));
  }

  useEffect(() => {
    fetchInstrumentOptions();
  }, []);

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
              value={positions.instrument.option}
              onChange={handleChange}
            >
              {instrumentOptions.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.option}>
                    {item.option}
                  </MenuItem>
                );
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
        </Stack>
      </Stack>
      {positions.conditions.map((condition, index) => {
        return (
          <Stack key={index} direction='row' spacing={4}>
            {/* /////////////////// */}
            {/* //// INDICATOR //// */}
            {/* /////////////////// */}
            <Stack spacing={1}>
              <Typography>Indicator</Typography>
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
                  label='parameters'
                  indicator={{
                    type: 'indicator_1',
                    name: condition.indicator_1.name,
                    propertyName: `conditions.${index}.indicator_1.parameters`,
                    onSave: handleChange,
                  }}
                />
              </Stack>
            </Stack>
            {/* ////////////////// */}
            {/* //// OPERATOR //// */}
            {/* ////////////////// */}
            <Stack spacing={1}>
              <Typography>Operator</Typography>
              <FormControl size='small'>
                <Select
                  name={`conditions.${index}.operator`}
                  value={condition.operator}
                  onChange={handleChange}
                >
                  <MenuItem value='greater_than'>Greater than (&#62;)</MenuItem>
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
            </Stack>
            {/* ///////////// */}
            {/* //// RHS //// */}
            {/* ///////////// */}
            <Stack spacing={1}>
              <Typography>Type</Typography>
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
            </Stack>
            {/* /////////////////// */}
            {/* //// INDICATOR //// */}
            {/* /////////////////// */}
            <Stack spacing={1}>
              <Typography>
                {condition.RHS === 'indicator' ? (
                  'Indicator'
                ) : condition.RHS === 'number' ? (
                  'Value'
                ) : (
                  <br />
                )}
              </Typography>
              <Stack direction='row' spacing={1}>
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
                <Stack direction='row' spacing={1} justifyContent='flex-end'>
                  <Button
                    data-name='AND'
                    variant={
                      condition.logic === 'AND' ? 'contained' : 'outlined'
                    }
                    onClick={(event) => handleAndOr(event, index)}
                  >
                    AND
                  </Button>
                  <Button
                    data-name='OR'
                    variant={
                      condition.logic === 'OR' ? 'contained' : 'outlined'
                    }
                    onClick={(event) => handleAndOr(event, index)}
                  >
                    OR
                  </Button>
                  {index !== 0 && (
                    <IconButton
                      aria-label='delete'
                      onClick={() => handleDeleteRow(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {index === positions.conditions.length - 1 && (
                    <Button variant='contained' onClick={handleAddLeg}>
                      add leg
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Stack>
            {/* ///////////////// */}
            {/* //// ADD LEG //// */}
            {/* ///////////////// */}
          </Stack>
        );
      })}
      {legs.length > 0 && <LegsContainer />}
    </Stack>
  );
}
