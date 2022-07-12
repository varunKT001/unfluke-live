import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, auth } from '../../api/user';

const initialState = {
  data: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    ///////////////
    //// Login ////
    ///////////////
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      alert(`Logged in as ${action.payload.data.name}`);
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      alert(action.payload);
    },
    //////////////////
    //// Register ////
    //////////////////
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      alert(`Registration successfull`);
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      alert(action.payload);
    },
    ////////////////
    //// Logout ////
    ////////////////
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = null;
      alert(`Logged out`);
    },
    [logout.rejected]: (state, action) => {
      state.isLoading = false;
      alert(action.payload);
    },
    //////////////
    //// Auth ////
    //////////////
    [auth.pending]: (state) => {
      state.isLoading = true;
    },
    [auth.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [auth.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
