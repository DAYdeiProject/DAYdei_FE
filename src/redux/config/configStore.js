import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/usersSlice";
import kakao from "../modules/kakaoSlice";

const store = configureStore({
  reducer: {
    users,
    kakao,
  },
});

export default store;
