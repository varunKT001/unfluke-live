import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStrategies,
  deleteStrategies,
  toggleStrategyStatus,
  addStrategy,
  updateStrategy,
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
      alert('Strategy created');
    },
    [addStrategy.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
    ////////////////
    //// UPDATE ////
    ////////////////
    [updateStrategy.pending]: (state) => {
      state.isLoading = true;
    },
    [updateStrategy.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      alert('Strategy edited');
    },
    [updateStrategy.rejected]: (state, { payload }) => {
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
      state.strategies = payload.data;
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
      alert('Strategy deleted');
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
      alert(
        `Strategy ${payload.data.status === 'active' ? 'disabled' : 'active'}`
      );
    },
    [toggleStrategyStatus.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
  },
});

export default strategiesSlice.reducer;
