import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api/axios";
import Cookies from "js-cookie";
import SetUserInfo from "../../utils/cookie/userInfo";

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
  statusCode: 0,
  myProfile: [],
  statusCodeProfile: 0,
  headerProfile: "",
  statusCodeDelete: 0,
  isDeleted: false,
};

export const __emailCheck = createAsyncThunk("login/emailCheck", async (email, thunkAPI) => {
  try {
    const response = await api.post(`/api/users/signup/${email}`);

    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
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
    const isDeleted = response.data.data.isDeleted;

    // 쿠키 시간 설정
    api.defaults.headers.common["Authorization"] = Token;
    const id = response.data.data.userId;
    SetUserInfo(Token, id);
    return { token: Token, isLogin, categoryList, nickName, isDeleted, data: response.data };
  } catch (error) {
    alert(error.response.data.data);
  }
});

export const __addCategories = createAsyncThunk("login/addCategories", async (Categories, thunkAPI) => {
  try {
    const response = await api.post("/api/users/categories", Categories);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.data);
  }
});

export const __requestNewPassword = createAsyncThunk("requestNewPassord", async (userInfo, thunkAPI) => {
  try {
    const response = await api.post("/api/users/reset/password", userInfo);
    return thunkAPI.fulfillWithValue(response.data.statusCode);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.data);
  }
});

export const __getMyProfile = createAsyncThunk("getMyProfile", async (id, thunkAPI) => {
  try {
    const response = await api.get(`/api/home/profile/${id}`);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __setProfile = createAsyncThunk("setProfile", async (formData, thunkAPI) => {
  try {
    const response = await api.patch(`/api/users/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return thunkAPI.fulfillWithValue(response.data.statusCode);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getHeaderProfile = createAsyncThunk("getHeaderProfile", async (id, thunkAPI) => {
  try {
    const response = await api.get(`/api/home/profile/${id}`);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __memberOut = createAsyncThunk("memberOut", async (user, thunkAPI) => {
  try {
    const response = await api.put("/api/users/delete", user);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
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
        state.isDeleted = action.payload.isDeleted;
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

    builder
      .addCase(__requestNewPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__requestNewPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.statusCode = action.payload;
      })
      .addCase(__requestNewPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isErrorMessage = action.payload;
      });

    builder
      .addCase(__getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.myProfile = action.payload;
      })
      .addCase(__getMyProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__setProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__setProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.statusCodeProfile = action.payload;
      })
      .addCase(__setProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.isErrorMessage = action.payload;
      });

    builder
      .addCase(__getHeaderProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getHeaderProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.headerProfile = action.payload;
      })
      .addCase(__getHeaderProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__memberOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__memberOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.statusCodeDelete = action.payload;
      })
      .addCase(__memberOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default usersSlice.reducer;
