import React from 'react';
import { Stack } from '@mui/material';
import MTMTarget from './MTMTarget';
import MTMStopLoss from './MTMStopLoss';

export default function MTM() {
  return (
    <Stack spacing={4}>
      <MTMTarget />
      <MTMStopLoss />
    </Stack>
  );
}
