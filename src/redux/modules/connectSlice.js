import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api/axios";

const initialState = {
  data: [],
  error: "",
  isError: false,
  isLoading: false,
};

//
export const __getConnect = createAsyncThunk("getConnect", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/notification`);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const connectSlice = createSlice({
  name: "connect",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getConnect.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getConnect.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(__getConnect.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default connectSlice.reducer;
