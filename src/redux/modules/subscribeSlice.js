import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subscribeInstance } from "../../utils/api/axios";

const initialState = {
  SubscribersList: [],
  SubscribesList: [],
  isLoading: false,
  isError: false,
  statusCode: 0,
  clickedButtonIds: [],
};

// 구독하는 계정 GET 요청
export const __getSubscribeList = createAsyncThunk("getSubscribeList", async (url, thunkAPI) => {
  try {
    const response = await subscribeInstance.get(`/list/${url}`);
    // console.log("내가 구독 List -------> ", response.data.data);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 나를 구독하는 계정 GET 요청
export const __getSubscriberList = createAsyncThunk("getSubscriberList", async (url, thunkAPI) => {
  try {
    const response = await subscribeInstance.get(`/followers/${url}`);
    // console.log("나를 구독 List -------> ", response.data.data);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 구독신청 POST요청
export const __addSubscribe = createAsyncThunk("addSubscribe", async (id, thunkAPI) => {
  try {
    const response = await subscribeInstance.post(`/${id}`);
    console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

//구독취소 요청
export const __cancelSubscribe = createAsyncThunk("cancelSubscribe", async (id, thunkAPI) => {
  try {
    const response = await subscribeInstance.delete(`/${id}`);
    console.log(response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

//일정 가리기 요청
export const __hideUser = createAsyncThunk("hideUser", async (id, thunkAPI) => {
  try {
    const response = await subscribeInstance.put(`/show/${id}`);
    console.log("put요청 리스펀스", response);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

//구독 보여주기,숨기기 모달에서 클릭된 버튼
// export const updateClickedButtonIds = (clickedButtonIds) => {
//   // console.log("리듀서가기전", clickedButtonIds);
//   return { type: "subscribe/updateClickedButtonIds", payload: clickedButtonIds };
// };

export const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {
    // "subscribe/updateClickedButtonIds": (state, action) => {
    //   console.log(action.payload);
    //   state.clickedButtonIds.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getSubscribeList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getSubscribeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.SubscribesList = action.payload;
      })
      .addCase(__getSubscribeList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__getSubscriberList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getSubscriberList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.SubscribersList = action.payload;
      })
      .addCase(__getSubscriberList.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__addSubscribe.fulfilled, (state, action) => {
        state.isError = false;
        state.statusCode = action.payload;
      })
      .addCase(__addSubscribe.rejected, (state) => {
        state.isError = true;
      });

    builder
      .addCase(__cancelSubscribe.fulfilled, (state, action) => {
        state.isError = false;
        state.statusCode = action.payload;
      })
      .addCase(__cancelSubscribe.rejected, (state) => {
        state.isError = true;
      });

    builder
      .addCase(__hideUser.fulfilled, (state, action) => {
        state.isError = false;
        state.statusCode = action.payload;
      })
      .addCase(__hideUser.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default subscribeSlice.reducer;
