import {createAsyncThunk} from '@reduxjs/toolkit';

// Créez une action asynchrone pour votre API
export const fetchFromApi = createAsyncThunk('api/fetchFromApi', async () => {
  const response = await fetch('http://localhost:3001/api');
  const data = await response.json();
  return data;
});
