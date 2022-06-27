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
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
    },
    //////////////////
    //// Register ////
    //////////////////
    [register.pending]: (state) => {
      console.log(state);
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
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
    },
    [logout.rejected]: (state, action) => {
      state.isLoading = false;
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
