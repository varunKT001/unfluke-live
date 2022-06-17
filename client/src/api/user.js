import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await Axios.post('/user/login', credentials);
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await Axios.post('/user/register', credentials);
      return response.data;
    } catch (error) {
      const { message } = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const response = await Axios.post('/user/logout');
    return response.data.message;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const auth = createAsyncThunk('user/auth', async (_, thunkAPI) => {
  try {
    const response = await Axios.post('/user/auth');
    return response.data;
  } catch (error) {
    const { message } = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});
