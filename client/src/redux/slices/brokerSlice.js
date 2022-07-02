import { createSlice } from '@reduxjs/toolkit';
import { addBroker } from '../../api/broker';
import { setDeepObjProp as set } from '../../utils/miscUtils';

const initialState = {
  isLoading: false,
  userID: '',
  password: '',
  auth_type: 'totp',
  pin: '',
  totp_secret: '',
  api_key: '',
  secret: '',
  broker: '',
  enctoken: '',
  subscribe_date_time: '',
  api: false,
};

const brokerSlice = createSlice({
  name: 'broker',
  initialState,
  reducers: {
    onChange: (state, { payload }) => {
      set(state, payload.name.split('.'), payload.value);
    },
    clearValues: (state) => {
      return initialState;
    },
  },
  extraReducers: {
    ////////////////////
    //// ADD BROKER ////
    ////////////////////
    [addBroker.pending]: (state) => {
      state.isLoading = true;
    },
    [addBroker.fulfilled]: (state) => {
      state.isLoading = false;
      alert('Settings saved');
    },
    [addBroker.rejected]: (state, { payload }) => {
      state.isLoading = false;
      alert(payload);
    },
  },
});

export const { onChange, clearValues } = brokerSlice.actions;
export default brokerSlice.reducer;
