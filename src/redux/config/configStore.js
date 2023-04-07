import { configureStore } from "@reduxjs/toolkit";
import memos from "../modules/memosSlice";
import users from "../modules/usersSlice";
import kakao from "../modules/kakaoSlice";
import header from "../modules/headerReducer";
import friends from "../modules/friendsSlice";
import connect from "../modules/connectSlice";
import calendar from "../modules/calendarSlice";
import subscribe from "../modules/subscribeSlice";

const store = configureStore({
  reducer: {
    users,
    kakao,
    friends,
    calendar,
    subscribe,
    connect,
    memos,
    header,
  },
});

export default store;
