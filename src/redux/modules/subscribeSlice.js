import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subscribeInstance } from "../../utils/api/axios";

const initialState = {
  isLoading: false,
  isError: false,
};

export const __addSubscribe = createAsyncThunk("addSubscribe", async (id, thunkAPI) => {
  try {
    const response = await subscribeInstance.post(`/${id}`);
    console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __cancelSubscribe = createAsyncThunk("cancelSubscribe", async (id, thunkAPI) => {
  try {
    const response = await subscribeInstance.delete(`/${id}`);
    console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__addSubscribe.fulfilled, (state, action) => {
        state.isError = false;
        state.statusCode = action.payload;
      })
      .addCase(__addSubscribe.rejected, (state) => {
        state.isError = true;
      });

    builder
      .addCase(__cancelSubscribe.fulfilled, (state) => {
        state.isError = false;
      })
      .addCase(__cancelSubscribe.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default subscribeSlice.reducer;
