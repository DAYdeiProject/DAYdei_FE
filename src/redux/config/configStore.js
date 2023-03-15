import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/usersSlice";
import kakao from "../modules/kakaoSlice";
import friends from "../modules/friendsSlice";

const store = configureStore({
  reducer: {
    users,
    kakao,
    friends,
  },
});

export default store;
