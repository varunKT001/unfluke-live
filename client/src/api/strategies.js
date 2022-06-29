import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getStrategiesFromLocalStorage,
  toggleStrategyStatusInLocalStorage,
  deleteStrategiesFromLocalStorage,
  updateStrategyInLocalStorage,
  saveStrategyToLocalStorage,
} from '../utils/localStorage';
import { clearValues as clearValuesStrategyOne } from '../redux/slices/strategyOneSlice';
import { clearValues as clearValuesStrategyTwo } from '../redux/slices/strategyTwoSlice';

export const addStrategy = createAsyncThunk(
  'strategies/addStrategy',
  async ({ isEditing, editStrategyId, ...strategy }, thunkAPI) => {
    try {
      const response = saveStrategyToLocalStorage(strategy);
      thunkAPI.dispatch(clearValuesStrategyOne());
      thunkAPI.dispatch(clearValuesStrategyTwo());
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
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
      thunkAPI.dispatch(fetchStrategies());
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateStrategy = createAsyncThunk(
  'strategies/deleteStrategies',
  async ({ id, state }, thunkAPI) => {
    try {
      const response = updateStrategyInLocalStorage({ id, state });
      thunkAPI.dispatch(clearValuesStrategyOne());
      thunkAPI.dispatch(clearValuesStrategyTwo());
      return response.message;
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
      thunkAPI.dispatch(fetchStrategies());
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
