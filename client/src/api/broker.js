import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearValues } from '../redux/slices/brokerSlice';
import Axios from 'axios';

export const addBroker = createAsyncThunk(
  'broker/addBroker',
  async ({ broker, navigate }, thunkAPI) => {
    try {
      const body = { user: thunkAPI.getState().user.data.id, ...broker };
      const response = await Axios.post('/broker', body);
      thunkAPI.dispatch(clearValues());
      navigate('/');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
