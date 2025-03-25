import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_BASE_URL;

export const fetchAll = createAsyncThunk(
  'parcels/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/parcels');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to fetch parcels'
      );
    }
  }
);

export const createParcel = createAsyncThunk(
  'parcels/create',
  async (parcelData, thunkAPI) => {
    try {
      const response = await axios.post('/parcels', parcelData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to create parcel'
      );
    }
  }
);

export const updateParcel = createAsyncThunk(
  'parcels/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/parcels/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to update parcel'
      );
    }
  }
);

export const deleteParcel = createAsyncThunk(
  'parcels/delete',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/parcels/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to delete parcel'
      );
    }
  }
);
