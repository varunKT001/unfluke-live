import { createSlice } from '@reduxjs/toolkit';
import { setDeepObjProp as set, deleteDeepObjProp as unset } from '../../utils';

const initialState = {
  name: 'strategy_name',
  strategySettings: {},
  positions: {
    legs: [],
  },
  MTMTarget: {
    type: 'None',
    value: 0,
  },
  MTMStopLoss: {
    fixedStopLoss: 'None',
    value: 0,
  },
  MTMTrailing: {
    value: 'None',
    type: 'percentage',
  },
  advancedSettings: {
    entry: {
      type: 'market_M',
    },
    exit: {
      type: 'market_M',
    },
  },
};

const strategyTwoSlice = createSlice({
  name: 'strategyTwo',
  initialState,
  reducers: {
    addLeg: (state, action) => {
      state.positions.legs.push(action.payload);
    },
    saveStrategyName: (state, action) => {
      state.name = action.payload;
    },
    saveStrategySettings: (state, action) => {
      state.strategySettings = action.payload;
    },
    updateLeg: (state, action) => {
      let leg = state.positions.legs.find(
        (item) => item.id === action.payload.id
      );
      set(leg, action.payload.name.split('.'), action.payload.value);
    },
    deleteLeg: (state, action) => {
      state.positions.legs = state.positions.legs.filter(
        (leg) => leg.id !== action.payload
      );
    },
    updateMTMTarget: (state, action) => {
      set(
        state.MTMTarget,
        action.payload.name.split('.'),
        action.payload.value
      );
    },
    updateMTMStopLoss: (state, action) => {
      set(
        state.MTMStopLoss,
        action.payload.name.split('.'),
        action.payload.value
      );
    },
    updateMTMTrailing: (state, action) => {
      set(
        state.MTMTrailing,
        action.payload.name.split('.'),
        action.payload.value
      );
    },
    updateAdvancedSettings: (state, action) => {
      set(
        state.advancedSettings,
        action.payload.name.split('.'),
        action.payload.value
      );
    },
    deleteStateProp: (state, action) => {
      unset(state, action.payload.split('.'));
    },
  },
});

export const {
  addLeg,
  saveStrategyName,
  saveStrategySettings,
  updateLeg,
  deleteLeg,
  updateMTMTarget,
  updateMTMStopLoss,
  updateMTMTrailing,
  deleteStateProp,
  updateAdvancedSettings,
} = strategyTwoSlice.actions;
export default strategyTwoSlice.reducer;
