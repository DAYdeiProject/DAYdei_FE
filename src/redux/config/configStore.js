import { configureStore } from "@reduxjs/toolkit";
import users from "../modules/usersSlice";

const store = configureStore({
  reducer: {
    users,
  },
});

export default store;
