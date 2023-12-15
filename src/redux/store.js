import {configureStore} from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import {spotifyApi} from './services/spotifyApi';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [spotifyApi.reducerPath]: spotifyApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(spotifyApi.middleware),
});
