import React from 'react';
import { Stack, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import Leg from './Leg';

export default function LegsContainer() {
  const { legs } = useSelector((store) => store.strategy.positions);
  return (
    <Stack
      boxShadow={3}
      borderRadius={1}
      divider={<Divider orientation='horizontal' flexItem />}
    >
      {legs.length > 0 &&
        legs.map((leg) => {
          return <Leg key={leg.id} {...leg}></Leg>;
        })}
    </Stack>
  );
}
