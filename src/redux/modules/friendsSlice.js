import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { friendsInstance } from "../../utils/api/axios";

const initialState = {
  RecommendList: [],
  FriendsList: [],
  FamousList: [],
  RequestedUsersList: [],
  SentUsersList: [],
  isLoading: false,
  isError: false,
  statusCode: 0,
  acceptStatusCode: 0,
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

// 친구신청 POST 요청
export const __requestFriend = createAsyncThunk("requestFriend", async (id, thunkAPI) => {
  try {
    const response = await friendsInstance.post(`/${id}`);
    console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// 친구요청 승인
export const __acceptNewFriend = createAsyncThunk("acceptFriend", async (id, thunkAPI) => {
  try {
    const response = await friendsInstance.put(`/${id}`);
    console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// 친구신청 취소, 거절, 친구 끊기
export const __cancelRequest = createAsyncThunk("cancelRequest", async (id, thunkAPI) => {
  try {
    const response = await friendsInstance.delete(`/${id}`);
    console.log("삭제요청--->", response);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// 로그인한 유저의 친구/구독 리스트 가져오기
export const __getFriendsList = createAsyncThunk("getFriendsList", async (url, thunkAPI) => {
  try {
    const response = await friendsInstance.get(`/list/${url}`);
    // console.log("getFriendList -------> ", response.data.data);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getFamousList = createAsyncThunk("getFamousList", async (payload, thunkAPI) => {
  try {
    const response = await friendsInstance.get("/list/famous", {
      headers: {
        Authorization: payload.token,
      },
    });
    console.log("인기 계정 가져오기 -->", response.data.data);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getRequestedUsersList = createAsyncThunk("getRequestedUsersList", async (payload, thunkAPI) => {
  try {
    const response = await friendsInstance.get("/list/response", {
      headers: {
        Authorization: payload.token,
      },
    });
    // console.log(response.data.data);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getSentUsersList = createAsyncThunk("getSentUsersList", async (_, thunkAPI) => {
  try {
    const response = await friendsInstance.get("/list/request");
    // console.log("내가보낸신청-->", response.data.data);
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
      .addCase(__acceptNewFriend.fulfilled, (state, action) => {
        state.isError = false;
        state.acceptStatusCode = action.payload;
      })
      .addCase(__acceptNewFriend.rejected, (state) => {
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

    builder
      .addCase(__getFamousList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getFamousList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.FamousList = action.payload;
      })
      .addCase(__getFamousList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__getRequestedUsersList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getRequestedUsersList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.RequestedUsersList = action.payload;
      })
      .addCase(__getRequestedUsersList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__getSentUsersList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getSentUsersList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.SentUsersList = action.payload;
      })
      .addCase(__getSentUsersList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default friendsSlice.reducer;
