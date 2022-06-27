import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getStrategiesFromLocalStorage,
  toggleStrategyStatusInLocalStorage,
  deleteStrategiesFromLocalStorage,
  updateStrategyInLocalStorage,
} from '../utils/localStorage';

export const fetchStrategies = createAsyncThunk(
  'strategies/fetchStrategies',
  async (_, thunkAPI) => {
    try {
      const response = getStrategiesFromLocalStorage();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteStrategies = createAsyncThunk(
  'strategies/deleteStrategies',
  async (strategyIdsArray, thunkAPI) => {
    try {
      const response = deleteStrategiesFromLocalStorage(strategyIdsArray);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateStrategy = createAsyncThunk(
  'strategies/deleteStrategies',
  async ({ id, type }, thunkAPI) => {
    try {
      const response = updateStrategyInLocalStorage({
        id,
        state: thunkAPI.getState()[type],
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const toggleStrategyStatus = createAsyncThunk(
  'strategies/deleteStrategies',
  async (id, thunkAPI) => {
    try {
      const response = toggleStrategyStatusInLocalStorage(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
