import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { memosInstance } from "../../utils/api/axios";

const initialState = {
  isLoading: false,
  isError: false,
  updatedMemos: [],
  statusCode: 0,
  statusCodeDelete: 0,
  statusCodeFix: 0,
};

// 메모 GET 요청
export const __getMemos = createAsyncThunk("getMemos", async (_, thunkAPI) => {
  try {
    const response = await memosInstance.get(`/`);
    // console.log("get요청 리스펀스 -------> ", response.data.data);
    return thunkAPI.fulfillWithValue(response.data.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 메모 POST 요청
export const __addMemo = createAsyncThunk("addMemo", async (memo, thunkAPI) => {
  try {
    const response = await memosInstance.post("/", memo);
    // console.log("post요청 리스펀스--", response.data);
    return thunkAPI.fulfillWithValue(response.data.statusCode);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.data);
  }
});

// 메모 DELETE 요청
export const __deleteMemo = createAsyncThunk("deleteMemo", async (id, thunkAPI) => {
  try {
    const response = await memosInstance.delete(`/${id}`);
    console.log("삭제요청 리스펀스 -->", response.data.statusCode);
    return thunkAPI.fulfillWithValue(response.data.statusCode);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

// 메모 수정 요청
export const __fixMemo = createAsyncThunk("deleteMemo", async (payload, thunkAPI) => {
  try {
    const response = await memosInstance.patch(`/${payload.id}`, payload.fixedMemo);
    console.log("수정요청 리스펀스 -->", response.data.statusCode);
    return thunkAPI.fulfillWithValue(response.data.statusCode);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const memosSlice = createSlice({
  name: "memos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getMemos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getMemos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.updatedMemos = action.payload;
      })
      .addCase(__getMemos.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__addMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__addMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.statusCode = action.payload;
      })
      .addCase(__addMemo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(__deleteMemo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteMemo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.statusCodeDelete = action.payload;
      })
      .addCase(__deleteMemo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;

        builder
          .addCase(__fixMemo.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(__fixMemo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.statusCodeFix = action.payload;
          })
          .addCase(__fixMemo.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          });
      });
  },
});

export default memosSlice.reducer;
