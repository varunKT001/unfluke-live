import { createSlice } from '@reduxjs/toolkit';
import { setDeepObjProp as set, deleteDeepObjProp as unset } from '../../utils';

const initialState = {
  name: 'strategy_name',
  strategySettings: {},
  positions: {
    legs: [],
    legOptions: {
      moveSlToCost: true,
      reEntry: false,
      tradeOnlyFirstEntry: false,
      waitAndTrade: true,
    },
  },
  MTMTarget: {
    type: 'None',
    value: 0,
  },
  MTMStopLoss: {
    fixedStopLoss: 'None',
    value: 0,
    profitLockTrailingStopLoss: {
      value: 'None',
      type: 'percentage',
    },
  },
};

const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    addLeg: (state, action) => {
      state.positions.legs.push(action.payload);
    },
    changeLegOptions: (state, action) => {
      state.positions.legOptions = {
        ...state.positions.legOptions,
        ...action.payload,
      };
      if (state.positions.legOptions.waitAndTrade) {
        state.positions.legs = state.positions.legs.map((leg) => {
          return {
            ...leg,
            waitTime: { type: 'immediate', value: 0 },
            squareOff: 'square_off_leg',
          };
        });
      } else {
        state.positions.legs = state.positions.legs.map((leg) => {
          delete leg.waitTime;
          return leg;
        });
      }
      if (state.positions.legOptions.reEntry) {
        state.positions.legs = state.positions.legs.map((leg) => {
          return {
            ...leg,
            reEntrySetting: { type: 're_none', maxEntries: 'no_max_limit' },
          };
        });
      } else {
        state.positions.legs = state.positions.legs.map((leg) => {
          delete leg.reEntrySetting;
          return leg;
        });
      }
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
    deleteStateProp: (state, action) => {
      unset(state, action.payload.split('.'));
    },
  },
});

export const {
  addLeg,
  changeLegOptions,
  saveStrategyName,
  saveStrategySettings,
  updateLeg,
  deleteLeg,
  updateMTMTarget,
  updateMTMStopLoss,
  deleteStateProp,
} = strategySlice.actions;
export default strategySlice.reducer;
