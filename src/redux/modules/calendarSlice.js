import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api/axios";

const initialState = {
  data: [],
  total: [],
  today: [],
  update: [],
  detail: [],
  imgList: [],
  mainToday: [],
  otherUser: [],
  otherUserUpdate: [],
  otherUserShare: [],
  error: "",
  isError: false,
  isLoading: false,
};

// 일정 추가시 태그할 친구 get
export const __getTargetList = createAsyncThunk("getTargetList", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/tags/find/${payload.target}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 일정 추가
export const __createNewPost = createAsyncThunk("createNewPost", async (payload, thunkAPI) => {
  try {
    const response = await api.post(`/api/posts`, payload.newPost, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 일정 update
export const __updatePost = createAsyncThunk("updatePost", async (payload, thunkAPI) => {
  try {
    const response = await api.patch(`/api/posts/${payload.postId}`, payload.updatePost, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 일정 drag update
export const __updateDragPost = createAsyncThunk("updateDragPost", async (payload, thunkAPI) => {
  try {
    console.log("updateDragPost payload--> ", payload);
    const response = await api.patch(`/api/posts/drag/${payload.postId}`, payload.updatePost, {
      headers: {
        Authorization: payload.token,
      },
    });
    console.log("updateDragPost response--> ", response);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 일정 delete
export const __deletePost = createAsyncThunk("deletePost", async (payload, thunkAPI) => {
  try {
    const response = await api.delete(`/api/posts/${payload.id}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 타 유저 프로필
export const __getOtherUser = createAsyncThunk("getOtherUser", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/home/profile/${payload.userId}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 메인 캘린더 전체 일정 get
export const __getTotalPosts = createAsyncThunk("getTotalPosts", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/home/posts/${payload.userId}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// sidebar 오늘의 일정 get
export const __getTodaySchedule = createAsyncThunk("getTodaySchedule", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/home/today?date=${payload.today}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// sidebar 업데이트한 친구목록 get
export const __getTodayUpdate = createAsyncThunk("getTodayUpdate", async (payload, thunkAPI) => {
  try {
    // update로 수정
    const response = await api.get(`/api/friends/update`, {
      headers: {
        Authorization: payload,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 타 유저의 오늘의 일정 get
export const __getOtherUserToday = createAsyncThunk("getOtherUserTodaySchedule", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/home/today/${payload.userId}?date=${payload.today}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    console.log("타유저 today : ", response);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 상세 일정 get
export const __getPostDetail = createAsyncThunk("getPostDetail", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/posts/${payload.id}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// img s3 post
export const __postImgUpload = createAsyncThunk("postImgUpload", async (payload, thunkAPI) => {
  try {
    const response = await api.post(`/api/posts/images`, payload.images, {
      headers: {
        Authorization: payload.token,
        "Content-Type": "multipart/form-data",
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 타유저 캘린더 업데이트 일정
export const __otherUserUpdatePost = createAsyncThunk("otherUserUpdatePost", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/post/update/${payload.userId}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 타유저 캘린더 나와 공유한 일정
export const __otherUserSharePost = createAsyncThunk("otherUserSharePost", async (payload, thunkAPI) => {
  try {
    const response = await api.get(`/api/post/share/${payload.userId}`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getTargetList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTargetList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(__getTargetList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__createNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__createNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(__createNewPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(__updatePost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__updateDragPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__updateDragPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(__updateDragPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(__deletePost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__getOtherUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getOtherUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.otherUser = action.payload;
      })
      .addCase(__getOtherUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__getTotalPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTotalPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.total = action.payload;
      })
      .addCase(__getTotalPosts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__getTodaySchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTodaySchedule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.today = action.payload;
      })
      .addCase(__getTodaySchedule.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__getTodayUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTodayUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.update = action.payload;
      })
      .addCase(__getTodayUpdate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__getOtherUserToday.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getOtherUserToday.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.mainToday = action.payload;
      })
      .addCase(__getOtherUserToday.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__getPostDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getPostDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.detail = action.payload;
      })
      .addCase(__getPostDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__postImgUpload.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__postImgUpload.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.imgList = action.payload;
      })
      .addCase(__postImgUpload.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__otherUserUpdatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__otherUserUpdatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.otherUserUpdate = action.payload;
      })
      .addCase(__otherUserUpdatePost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__otherUserSharePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__otherUserSharePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.otherUserShare = action.payload;
      })
      .addCase(__otherUserSharePost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default calendarSlice.reducer;
