import { configureStore } from "@reduxjs/toolkit";
import memos from "../modules/memosSlice";
import users from "../modules/usersSlice";
import kakao from "../modules/kakaoSlice";
import alert from "../modules/alertReducer";
import header from "../modules/headerReducer";
import friends from "../modules/friendsSlice";
import connect from "../modules/connectSlice";
import calendar from "../modules/calendarSlice";
import post from "../modules/postReducer";
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
    alert,
    post,
  },
});

export default store;
