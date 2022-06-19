import React from 'react';
import { Stack, Typography, Divider } from '@mui/material';
import Positions from './Positions';
import Strategy from './Strategy';

export default function AlgorithmForm() {
  return (
    <Stack spacing={4} divider={<Divider orientation='horizontal' flexItem />}>
      <Typography variant='h5'>Strategy name</Typography>
      <Strategy />
      <Positions />
    </Stack>
  );
}
