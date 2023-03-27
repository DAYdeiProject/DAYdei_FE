import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessJWTToken");

export const kakao = axios.create({
  baseURL: process.env.REACT_APP_DAYDEI_URL,
});

export const api = axios.create({
  baseURL: process.env.REACT_APP_DAYDEI_URL,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessJWTToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// console.log(token);
export const friendsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DAYDEI_URL}/api/friends`,
  headers: {
    Authorization: token,
  },
});

friendsInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessJWTToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const subscribeInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DAYDEI_URL}/api/subscribes`,
  headers: {
    Authorization: token,
  },
});

subscribeInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessJWTToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const memosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DAYDEI_URL}/api/memos`,
  headers: {
    Authorization: token,
  },
});

memosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accessJWTToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
