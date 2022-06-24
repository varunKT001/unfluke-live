import React from 'react';
import { Stack } from '@mui/material';
import MTMTarget from './MTMTarget';
import MTMStopLoss from './MTMStopLoss';
import MTMTrailing from './MTMTrailing';

export default function MTM({
  updateMTMTarget,
  updateMTMStopLoss,
  updateMTMTrailing,
  deleteStateProp,
  strategy,
}) {
  return (
    <Stack direction='row' spacing={4}>
      <MTMTarget {...{ updateMTMTarget, strategy }} />
      <MTMStopLoss {...{ updateMTMStopLoss, strategy }} />
      <MTMTrailing {...{ updateMTMTrailing, deleteStateProp, strategy }} />
    </Stack>
  );
}
