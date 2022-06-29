import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PercentIcon from '@mui/icons-material/Percent';
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

export default function AdvancedSettings({ updateAdvancedSettings, strategy }) {
  const dispatch = useDispatch();
  const { advancedSettings } = useSelector((store) => store[strategy]);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    if (
      (name.split('.')[2] === 'triggerAndPriceLimitBufferValue' ||
        name.split('.')[2] ===
          `${name.split('.')[0]}WithMarketOrderIfOpenForN`) &&
      value < 0
    ) {
      value = 0;
    }
    const payload = { name, value };
    dispatch(updateAdvancedSettings(payload));
  }

  return (
    <Stack spacing={2}>
      <Typography variant='button' color='grey.600'>
        advanced settings
      </Typography>
      {/* /////////////// */}
      {/* //// ENTRY //// */}
      {/* /////////////// */}
      <Stack direction='row' spacing={4}>
        {/* //////////////////// */}
        {/* //// ENTRY TYPE //// */}
        {/* //////////////////// */}
        <Stack spacing={1}>
          <Typography>Entry order type:</Typography>
          <FormControl size='small'>
            <Select
              name='entry.type'
              value={advancedSettings.entry.type}
              onChange={handleChange}
            >
              <MenuItem value='market_M'>Market (M)</MenuItem>
              <MenuItem value='limit_L_or_stoploss_limit_SL-L'>
                Limit (L) / Stoploss limit SL-L
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* ///////////////////////////////////////////////// */}
        {/* //// ENTRY TRIGGER AND LIMIT PRICE BUFFER IN //// */}
        {/* ///////////////////////////////////////////////// */}
        {advancedSettings.entry.type !== 'market_M' && (
          <Stack spacing={1}>
            <Typography>Trigger and limit price buffer in:</Typography>
            <FormControl size='small'>
              <Select
                name='entry.options.triggerAndPriceLimitBufferIn'
                value={
                  advancedSettings.entry.options.triggerAndPriceLimitBufferIn
                }
                onChange={handleChange}
              >
                <MenuItem value='percentage'>Percentage</MenuItem>
                <MenuItem value='points'>Points</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
        {/* //////////////////////////////////////////////////// */}
        {/* //// ENTRY TRIGGER AND LIMIT PRICE BUFFER VALUE //// */}
        {/* //////////////////////////////////////////////////// */}
        {advancedSettings.entry.type !== 'market_M' && (
          <Stack spacing={1}>
            <Typography>Trigger and limit price buffer value:</Typography>
            <TextField
              size='small'
              type='number'
              name='entry.options.triggerAndPriceLimitBufferValue'
              value={
                advancedSettings.entry.options.triggerAndPriceLimitBufferValue
              }
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {advancedSettings.entry.options
                      .triggerAndPriceLimitBufferIn === 'percentage' ? (
                      <PercentIcon />
                    ) : (
                      'pts'
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        )}
        {/* //////////////////////////////////////////////////// */}
        {/* //// ENTRY WITH MARKET ORDER IF OPEN FOR N SECS //// */}
        {/* //////////////////////////////////////////////////// */}
        {advancedSettings.entry.type !== 'market_M' && (
          <Stack spacing={1}>
            <Typography>
              Entry with Market order if order Open for (N) secs:
            </Typography>
            <TextField
              size='small'
              type='number'
              name='entry.options.entryWithMarketOrderIfOpenForN'
              value={
                advancedSettings.entry.options.entryWithMarketOrderIfOpenForN
              }
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>secs</InputAdornment>
                ),
              }}
            />
          </Stack>
        )}
      </Stack>
      {/* ////////////// */}
      {/* //// EXIT //// */}
      {/* ////////////// */}
      <Stack direction='row' spacing={4}>
        {/* /////////////////// */}
        {/* //// EXIT TYPE //// */}
        {/* /////////////////// */}
        <Stack spacing={1}>
          <Typography>Exit order type:</Typography>
          <FormControl size='small'>
            <Select
              name='exit.type'
              value={advancedSettings.exit.type}
              onChange={handleChange}
            >
              <MenuItem value='market_M'>Market (M)</MenuItem>
              <MenuItem value='limit_L_or_stoploss_limit_SL-L'>
                Limit (L) / Stoploss limit SL-L
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* //////////////////////////////////////////////// */}
        {/* //// EXIT TRIGGER AND LIMIT PRICE BUFFER IN //// */}
        {/* //////////////////////////////////////////////// */}
        {advancedSettings.exit.type !== 'market_M' && (
          <Stack spacing={1}>
            <Typography>Trigger and limit price buffer in:</Typography>
            <FormControl size='small'>
              <Select
                name='exit.options.triggerAndPriceLimitBufferIn'
                value={
                  advancedSettings.exit.options.triggerAndPriceLimitBufferIn
                }
                onChange={handleChange}
              >
                <MenuItem value='percentage'>Percentage</MenuItem>
                <MenuItem value='points'>Points</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
        {/* /////////////////////////////////////////////////// */}
        {/* //// EXIT TRIGGER AND LIMIT PRICE BUFFER VALUE //// */}
        {/* /////////////////////////////////////////////////// */}
        {advancedSettings.exit.type !== 'market_M' && (
          <Stack spacing={1}>
            <Typography>Trigger and limit price buffer value:</Typography>
            <TextField
              size='small'
              type='number'
              name='exit.options.triggerAndPriceLimitBufferValue'
              value={
                advancedSettings.exit.options.triggerAndPriceLimitBufferValue
              }
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    {advancedSettings.exit.options
                      .triggerAndPriceLimitBufferIn === 'percentage' ? (
                      <PercentIcon />
                    ) : (
                      'pts'
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        )}
        {/* /////////////////////////////////////////////////// */}
        {/* //// EXIT WITH MARKET ORDER IF OPEN FOR N SECS //// */}
        {/* /////////////////////////////////////////////////// */}
        {advancedSettings.exit.type !== 'market_M' && (
          <Stack spacing={1}>
            <Typography>
              Exit with Market order if order Open for (N) secs:
            </Typography>
            <TextField
              size='small'
              type='number'
              name='exit.options.exitWithMarketOrderIfOpenForN'
              value={
                advancedSettings.exit.options.exitWithMarketOrderIfOpenForN
              }
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>secs</InputAdornment>
                ),
              }}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
