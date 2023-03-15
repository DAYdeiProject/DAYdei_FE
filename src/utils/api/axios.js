import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessJWTToken");

export const api = axios.create({
  baseURL: process.env.REACT_APP_DAYDEI_URL,
});

export const friendsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DAYDEI_URL}/api/friends`,
  headers: {
    Authorization: token,
  },
});
