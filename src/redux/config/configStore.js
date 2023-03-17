import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/usersSlice";
import kakao from "../modules/kakaoSlice";
import friends from "../modules/friendsSlice";
import calendar from "../modules/calendarSlice";

const store = configureStore({
  reducer: {
    users,
    kakao,
    friends,
    calendar,
  },
});

export default store;
