import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessJWTToken");

export const api = axios.create({
  baseURL: process.env.REACT_APP_DAYDEI_URL,
});

// console.log(token);
export const friendsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DAYDEI_URL}/api/friends`,
  headers: {
    Authorization: token,
  },
});

export const subscribeInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DAYDEI_URL}/api/subscribes`,
  headers: {
    Authorization: token,
  },
});
