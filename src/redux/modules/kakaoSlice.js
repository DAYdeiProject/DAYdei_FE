import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { kakao } from "../../utils/api/axios";
import SetUserInfo from "../../utils/cookie/userInfo";

const initialState = {
  data: "",
  isError: false,
  isLoading: false,
};

export const __kakaoLogin = createAsyncThunk("login/kakao", async (payload, thunkAPI) => {
  try {
    // 성공 시 토큰 반환 됨
    const response = await kakao.get(`/api/users/kakao/callback?code=${payload}`);

    // 토큰 헤더에 넣기
    const token = response.headers.authorization;
    kakao.defaults.headers.common["Authorization"] = token;
    const id = response.data.data.userId;
    SetUserInfo(token, id);

    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __friendsList = createAsyncThunk("login/friends", async (payload, thunkAPI) => {
  try {
    const response = await kakao.get(`/api/users/kakao_friends/callback?code=${payload.code}`, {
      headers: {
        Authorization: payload.token,
      },
    });

    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const kakaoSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__kakaoLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__kakaoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(__kakaoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(__friendsList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__friendsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(__friendsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default kakaoSlice.reducer;
