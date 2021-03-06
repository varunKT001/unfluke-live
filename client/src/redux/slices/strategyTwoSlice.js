import { createSlice } from '@reduxjs/toolkit';
import { setDeepObjProp as set } from '../../utils/miscUtils';

const initialState = {
  name: 'strategy_name',
  strategyType: 'strategy_two',
  status: 'active',
  strategySettings: {
    underlying: 'spot',
    tradeType: 'intraday',
    duration: 'STBT_BTST',
    weekDays: ['monday', 'wednessday', 'friday'],
    startTime: {
      hour: 9,
      minute: 15,
      second: 0,
    },
    endTime: {
      hour: 9,
      minute: 15,
      second: 0,
    },
    nextDayEndTime: {
      hour: 9,
      minute: 15,
      second: 0,
    },
    checkConditionNextDayAfter: {
      hour: 9,
      minute: 15,
      second: 0,
    },
    daysBeforeExpiry: 4,
  },
  positions: {
    legs: [],
    legOptions: {
      waitAndTrade: false,
      moveSlToCost: false,
    },
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
    values: { x: 0, y: 0 },
  },
  advancedSettings: {
    entry: {
      type: 'market_M',
      options: {
        triggerAndPriceLimitBufferIn: 'percentage',
        triggerAndPriceLimitBufferValue: '3',
        entryWithMarketOrderIfOpenForN: '10',
      },
    },
    exit: {
      type: 'market_M',
      options: {
        triggerAndPriceLimitBufferIn: 'percentage',
        triggerAndPriceLimitBufferValue: '3',
        entryWithMarketOrderIfOpenForN: '10',
      },
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
    onChange: (state, { payload }) => {
      set(state, payload.name.split('.'), payload.value);
    },
    changeLegOptions: (state, action) => {
      state.positions.legOptions = {
        ...state.positions.legOptions,
        ...action.payload,
      };
    },
    changeLegSegment: (state, { payload }) => {
      state.positions.legs.forEach((leg) => {
        leg.segment = payload;
      });
    },
    updateLeg: (state, action) => {
      let leg = state.positions.legs.find((item) => {
        if (item.id && item.id === action.payload.id) return true;
        else if (item._id && item._id === action.payload.id) return true;
        return false;
      });
      set(leg, action.payload.name.split('.'), action.payload.value);
    },
    deleteLeg: (state, action) => {
      state.positions.legs = state.positions.legs.filter((leg) => {
        if (leg.id && leg.id === action.payload) return false;
        else if (leg._id && leg._id === action.payload) return false;
        return true;
      });
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
    setEditStrategy: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
    clearValues: (state) => {
      return { ...initialState };
    },
  },
});

export const {
  addLeg,
  updateLeg,
  deleteLeg,
  updateMTMTarget,
  updateMTMStopLoss,
  updateMTMTrailing,
  updateAdvancedSettings,
  onChange,
  setEditStrategy,
  clearValues,
  changeLegSegment,
  changeLegOptions,
} = strategyTwoSlice.actions;
export default strategyTwoSlice.reducer;
