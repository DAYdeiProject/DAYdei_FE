import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api/axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const initialState = {
  token: "",
  isError: false,
  isLoading: false,
};

export const __kakaoLogin = createAsyncThunk("login/kakao", async (payload, thunkAPI) => {
  console.log("payload : ", payload);
  try {
    // 성공 시 토큰 반환 됨
    const response = await api.get(`/api/users/kakao/callback?code=${payload}`);
    // 토큰 헤더에 넣기
    const token = response.headers.authorization;
    Cookies.set("accessJWTToken", token);

    console.log(response.data);

    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const kakaoSlice = createSlice({
  name: "token",
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
        state.token = action.payload;
      })
      .addCase(__kakaoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default kakaoSlice.reducer;
