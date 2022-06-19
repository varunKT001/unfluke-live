import { createSlice } from '@reduxjs/toolkit';

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
    },
  },
});

export const { addLeg, changeLegOptions } = strategySlice.actions;
export default strategySlice.reducer;
