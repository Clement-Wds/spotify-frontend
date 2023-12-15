import {createSlice} from '@reduxjs/toolkit';
import {fetchFromApi} from './fetchFromApi';

// Créez une slice pour votre API
const apiSlice = createSlice({
  name: 'api',
  initialState: {data: [], status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFromApi.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchFromApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFromApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
