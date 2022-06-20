import { createSlice } from '@reduxjs/toolkit';
import { setDeepObjProp as set } from '../../utils';

const initialState = {
  name: 'strategy_name',
  legs: [],
  legOptions: {
    moveSlToCost: true,
    reEntry: false,
    tradeOnlyFirstEntry: false,
    waitAndTrade: true,
  },
};

const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    addLeg: (state, action) => {
      state.legs.push(action.payload);
    },
    changeLegOptions: (state, action) => {
      state.legOptions = { ...state.legOptions, ...action.payload };
      if (state.legOptions.waitAndTrade) {
        state.legs = state.legs.map((leg) => {
          return {
            ...leg,
            waitTime: { type: 'immediate', value: 0 },
            squareOff: 'square_off_leg',
          };
        });
      } else {
        state.legs = state.legs.map((leg) => {
          delete leg.waitTime;
          return leg;
        });
      }
      if (state.legOptions.reEntry) {
        state.legs = state.legs.map((leg) => {
          return {
            ...leg,
            reEntrySetting: { type: 're_none', maxEntries: 'no_max_limit' },
          };
        });
      } else {
        state.legs = state.legs.map((leg) => {
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
      let leg = state.legs.find((item) => item.id === action.payload.id);
      set(leg, action.payload.name.split('.'), action.payload.value);
    },
    deleteLeg: (state, action) => {
      state.legs = state.legs.filter((leg) => leg.id !== action.payload);
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
} = strategySlice.actions;
export default strategySlice.reducer;
