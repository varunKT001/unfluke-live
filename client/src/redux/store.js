import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import strategyOneReducer from './slices/strategyOneSlice';
import strategyTwoReducer from './slices/strategyTwoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    strategyOne: strategyOneReducer,
    strategyTwo: strategyTwoReducer,
  },
});

export default store;
