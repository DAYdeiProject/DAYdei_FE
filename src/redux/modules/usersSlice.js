import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api/axios";
import Cookies from "js-cookie";

const initialState = {
  users: [],
  message: "",
  token: "",
  isError: false,
  isLoading: false,
  isErrorMessage: "",
  isLogin: false,
  isCheck: "",
};

export const __emailCheck = createAsyncThunk("login/emailCheck", async (email, thunkAPI) => {
  try {
    const response = await api.post(`/api/users/signup/${email}`);
    console.log(response);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __addUser = createAsyncThunk("login/signup", async (newUser, thunkAPI) => {
  try {
    const response = await api.post("/api/users/signup", newUser);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.data);
  }
});

export const __loginUser = createAsyncThunk("login/login", async (loginUser) => {
  try {
    const response = await api.post("/api/users/login", loginUser);
    const Token = response.headers.authorization;
    const isLogin = response.data.data.isLogin;
    Cookies.set("accessJWTToken", Token);

    api.defaults.headers.common["Authorization"] = Token;

    return { token: Token, isLogin };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__emailCheck.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__emailCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isCheck = action.payload;
      })
      .addCase(__emailCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(__addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isErrorMessage = action.payload;
      });

    builder
      .addCase(__loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLogin = action.payload.isLogin;
      })
      .addCase(__loginUser.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default usersSlice.reducer;
