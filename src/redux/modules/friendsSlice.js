import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { friendsInstance } from "../../utils/api/axios";

const initialState = {
  RecommendList: [],
  FriendsList: [],
  isLoading: false,
  isError: false,
  statusCode: 0,
};

export const __getRecommend = createAsyncThunk("getRecommend", async (url, thunkAPI) => {
  try {
    const response = await friendsInstance.get(`/recommend/${url}`);
    // console.log("slice getrecommend -------> ", response);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __requestFriend = createAsyncThunk("requestFriend", async (id, thunkAPI) => {
  try {
    const response = await friendsInstance.post(`/${id}`);
    // console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __cancelRequest = createAsyncThunk("cancelRequest", async (id, thunkAPI) => {
  try {
    const response = await friendsInstance.delete(`/${id}`);
    console.log("삭제요청 성공--->", response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getFriendsList = createAsyncThunk("getFriendsList", async (_, thunkAPI) => {
  try {
    const response = await friendsInstance.get("/list");
    console.log(response.data.data);
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

    builder
      .addCase(__requestFriend.fulfilled, (state, action) => {
        state.isError = false;
        state.statusCode = action.payload;
      })
      .addCase(__requestFriend.rejected, (state) => {
        state.isError = true;
      });

    builder
      .addCase(__cancelRequest.fulfilled, (state, action) => {
        state.isError = false;
        state.statusCode = action.payload;
      })
      .addCase(__cancelRequest.rejected, (state) => {
        state.isError = true;
      });

    builder
      .addCase(__getFriendsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getFriendsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.FriendsList = action.payload;
      })
      .addCase(__getFriendsList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default friendsSlice.reducer;
