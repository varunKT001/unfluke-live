import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStrategies,
  deleteStrategies,
  toggleStrategyStatus,
} from '../../api/strategies';

const initialState = {
  isLoading: false,
  strategies: [],
};

const strategiesSlice = createSlice({
  name: 'strategies',
  initialState,
  extraReducers: {
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
    [fetchStrategies.pending]: (state) => {
      state.isLoading = false;
    },
    ////////////////
    //// DELETE ////
    ////////////////
    [deleteStrategies.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteStrategies.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.strategies = payload;
    },
    [deleteStrategies.pending]: (state) => {
      state.isLoading = false;
    },
    ////////////////
    //// TOGGLE ////
    ////////////////
    [toggleStrategyStatus.pending]: (state) => {
      state.isLoading = true;
    },
    [toggleStrategyStatus.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.strategies = payload;
    },
    [toggleStrategyStatus.pending]: (state) => {
      state.isLoading = false;
    },
  },
});

export default strategiesSlice.reducer;
