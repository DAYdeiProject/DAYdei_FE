import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api/axios";
import Cookies from "js-cookie";

const initialState = {
  users: [],
  message: "",
  token: "",
};

export const __addUser = createAsyncThunk("login/signup", async (newUser) => {
  const response = await api.post("/api/users/signup", newUser);
  return newUser;
});

export const __loginUser = createAsyncThunk("login/login", async (loginUser) => {
  try {
    const response = await api.post("/api/user/login", loginUser);
    const Token = response.headers.authorization;

    Cookies.set("accessJWTToken", Token);

    api.defaults.headers.common["Authorization"] = Token;

    return { token: Token };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(__addUser.rejected, (state, action) => {
        state.message = action.error.message;
      });

    builder
      .addCase(__loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(__loginUser.rejected, (state, action) => {
        state.message = action.error.message;
      });
  },
});

export default usersSlice.reducer;
