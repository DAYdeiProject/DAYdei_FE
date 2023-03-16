import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { friendsInstance } from "../../utils/api/axios";

const initialState = {
  RecommendList: [],
};

export const __getRecommend = createAsyncThunk("getRecommend", async (_, thunkAPI) => {
  try {
    const response = await friendsInstance.get(`/recommend/?category=&searchword=`);
    console.log(response);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getRecommend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getRecommend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.RecommendList = action.payload;
      })
      .addCase(__getRecommend.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default friendsSlice.reducer;
