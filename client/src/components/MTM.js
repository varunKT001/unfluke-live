import React from 'react';
import { Stack } from '@mui/material';
import MTMTarget from './MTMTarget';
import MTMStopLoss from './MTMStopLoss';
import TralingStopLoss from './TrailingStopLoss';

export default function MTM() {
  return (
    <Stack direction='row' spacing={4}>
      <MTMTarget />
      <MTMStopLoss />
      <TralingStopLoss />
    </Stack>
  );
}
