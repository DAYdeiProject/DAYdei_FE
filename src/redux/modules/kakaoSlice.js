import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api/axios";
import Cookies from "js-cookie";

const initialState = {
  data: "",
  isError: false,
  isLoading: false,
};

export const __kakaoLogin = createAsyncThunk("login/kakao", async (payload, thunkAPI) => {
  try {
    // 성공 시 토큰 반환 됨
    const response = await api.get(`/api/users/kakao/callback?code=${payload}`);

    // 토큰 헤더에 넣기
    const token = response.headers.authorization;
    // 토큰 만료 시간
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
    Cookies.set("accessJWTToken", token, { expires: expiryDate });
    // userInfo
    const userInfo = {
      userId: response.data.data.userId,
      nickName: response.data.data.nickName,
    };
    api.defaults.headers.common["Authorization"] = token;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    console.log("error : ", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __friendsList = createAsyncThunk("login/friends", async (payload, thunkAPI) => {
  try {
    // 성공 시 토큰 반환 됨
    const response = await api.get(`/api/users/kakao_friends/callback?code=${payload.code}`, {
      headers: {
        Authorization: payload.token,
      },
    });

    // 토큰 헤더에 넣기
    const token = response.headers.authorization;
    // 토큰 만료 시간
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
    Cookies.set("accessJWTToken", token, { expires: expiryDate });

    //userInfo
    const userInfo = {
      userId: response.data.data.userId,
      nickName: response.data.data.nickName,
    };
    api.defaults.headers.common["Authorization"] = token;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    console.log("error : ", error);
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
