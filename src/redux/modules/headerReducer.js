const TEXT_STATE = "header/TEXT_STATE";
const NOTI_POSTID = "header/NOTI_POSTID";
const NOTI_STATE = "header/NOTI_STATE";
const OTHER_USER_ID = "header/OTHER_USER_ID";

// 헤더 텍스트 상태
export const textState = (payload) => {
  return {
    type: TEXT_STATE,
    payload: payload,
  };
};
// 알림 클릭시 POST ID
export const setNotificationPostId = (payload) => {
  return {
    type: NOTI_POSTID,
    payload: payload,
  };
};
// 새로운 알림
export const newNotificationState = (payload) => {
  return {
    type: NOTI_STATE,
    payload: payload,
  };
};
// 다른유저 id
export const otherIdState = (payload) => {
  return {
    type: OTHER_USER_ID,
    payload: payload,
  };
};

const initialState = {
  text: "home",
  notiInfo: "",
  notiState: {},
  otherId: "",
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEXT_STATE:
      return {
        ...state,
        text: action.payload,
      };
    case NOTI_POSTID:
      return {
        notiInfo: action.payload,
      };
    case NOTI_STATE:
      return {
        notiState: action.payload,
      };
    case OTHER_USER_ID:
      return {
        otherId: action.payload,
      };
    default:
      return state;
  }
};
export default headerReducer;
