import React from 'react';
import { Stack } from '@mui/material';
import MTMTarget from './MTMTarget';
import MTMStopLoss from './MTMStopLoss';
import MTMTrailing from './MTMTrailing';

export default function MTM() {
  return (
    <Stack direction='row' spacing={4}>
      <MTMTarget />
      <MTMStopLoss />
      <MTMTrailing />
    </Stack>
  );
}
