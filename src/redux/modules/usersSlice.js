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
  categoryList: [],
  nickName: "",
  data: "",
};

export const __emailCheck = createAsyncThunk("login/emailCheck", async (email, thunkAPI) => {
  try {
    const response = await api.post(`/api/users/signup/${email}`);
    // console.log(response);
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
    const categoryList = response.data.data.categoryList;
    const nickName = response.data.data.nickName;
    Cookies.set("accessJWTToken", Token);

    //userInfo
    const userInfo = response.data.data;
    api.defaults.headers.common["Authorization"] = Token;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    return { token: Token, isLogin, categoryList, nickName, data: response.data };
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.message);
  }
});

export const __addCategories = createAsyncThunk("login/addCategories", async (Categories, thunkAPI) => {
  try {
    const response = await api.post("/api/users/categories", Categories);
    // console.log(response);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.data);
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
        state.categoryList = action.payload.categoryList;
        state.nickName = action.payload.nickName;
        state.data = action.payload.data;
      })
      .addCase(__loginUser.rejected, (state, action) => {
        state.message = action.error.message;
      });

    builder
      .addCase(__addCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(__addCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isErrorMessage = action.payload;
      });
  },
});

export default usersSlice.reducer;
