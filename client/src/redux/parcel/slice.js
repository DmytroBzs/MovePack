import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAll,
  updateParcel,
  deleteParcel,
  createParcel,
} from './operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const parcelsSlice = createSlice({
  name: 'parcels',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAll.pending, handlePending)
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchAll.rejected, handleRejected)
      .addCase(updateParcel.pending, handlePending)
      .addCase(updateParcel.fulfilled, (state, action) => {
        const updatedParcel = action.payload.data;
        const index = state.items.findIndex(
          item => item._id === updatedParcel._id
        );
        if (index !== -1) {
          state.items[index] = updatedParcel;
        }
        state.loading = false;
      })
      .addCase(updateParcel.rejected, handleRejected)
      .addCase(createParcel.pending, handlePending)
      .addCase(createParcel.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
        state.loading = false;
      })
      .addCase(createParcel.rejected, handleRejected)
      .addCase(deleteParcel.pending, handlePending)
      .addCase(deleteParcel.fulfilled, (state, action) => {
        const deletedId = action.payload.data._id;
        state.items = state.items.filter(item => item._id !== deletedId);
        state.loading = false;
      })
      .addCase(deleteParcel.rejected, handleRejected);
  },
});

export default parcelsSlice.reducer;
