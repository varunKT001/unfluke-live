import { createAsyncThunk } from '@reduxjs/toolkit';
import { deepCopy } from '../utils/miscUtils';
import { clearValues as clearValuesStrategyOne } from '../redux/slices/strategyOneSlice';
import { clearValues as clearValuesStrategyTwo } from '../redux/slices/strategyTwoSlice';
import Axios from 'axios';

export const addStrategy = createAsyncThunk(
  'strategies/addStrategy',
  async (strategy, thunkAPI) => {
    try {
      const body = { user: thunkAPI.getState().user.data.id, ...strategy };
      const response = await Axios.post('/strategy', body);
      thunkAPI.dispatch(clearValuesStrategyOne());
      thunkAPI.dispatch(clearValuesStrategyTwo());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const fetchStrategies = createAsyncThunk(
  'strategies/fetchStrategies',
  async (_, thunkAPI) => {
    try {
      const response = await Axios.get('/strategy');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteStrategies = createAsyncThunk(
  'strategies/deleteStrategies',
  async (strategyIdsArray, thunkAPI) => {
    try {
      const response = await Axios.delete('/strategy', {
        data: strategyIdsArray,
      });
      thunkAPI.dispatch(fetchStrategies());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const updateStrategy = createAsyncThunk(
  'strategies/updateStrategy',
  async ({ id, state }, thunkAPI) => {
    try {
      const response = await Axios.patch('/strategy', { id, state });
      thunkAPI.dispatch(clearValuesStrategyOne());
      thunkAPI.dispatch(clearValuesStrategyTwo());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const toggleStrategyStatus = createAsyncThunk(
  'strategies/toggleStrategyStatus',
  async (id, thunkAPI) => {
    try {
      const state = deepCopy(
        thunkAPI.getState().strategies.strategies.find((s) => s._id === id)
      );
      state.status = state.status === 'active' ? 'disabled' : 'active';
      const response = await Axios.patch('/strategy', { id, state });
      thunkAPI.dispatch(fetchStrategies());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
