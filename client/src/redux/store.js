import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import strategyReducer from './slices/strategySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    strategy: strategyReducer,
  },
});

export default store;
