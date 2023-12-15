import {configureStore} from '@reduxjs/toolkit';
import playerReducer from './features/playerSlice';
import apiReducer from './features/apiSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    api: apiReducer,
  },
});
