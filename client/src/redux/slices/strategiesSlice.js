import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStrategies,
  deleteStrategies,
  toggleStrategyStatus,
  addStrategy,
} from '../../api/strategies';

const initialState = {
  isLoading: false,
  strategies: [],
};

const strategiesSlice = createSlice({
  name: 'strategies',
  initialState,
  extraReducers: {
    /////////////
    //// ADD ////
    /////////////
    [addStrategy.pending]: (state) => {
      state.isLoading = true;
    },
    [addStrategy.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
    [addStrategy.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
    ///////////////
    //// FETCH ////
    ///////////////
    [fetchStrategies.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchStrategies.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.strategies = payload;
    },
    [fetchStrategies.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
    ////////////////
    //// DELETE ////
    ////////////////
    [deleteStrategies.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteStrategies.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
    [deleteStrategies.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
    ////////////////
    //// TOGGLE ////
    ////////////////
    [toggleStrategyStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [toggleStrategyStatus.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
    [toggleStrategyStatus.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
  },
});

export default strategiesSlice.reducer;
