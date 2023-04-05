const TEXT_STATE = "header/TEXT_STATE";
const NOTI_POSTID = "header/NOTI_POSTID";

// action creator
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

const initialState = {
  text: "home",
  notiInfo: "",
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEXT_STATE:
      return {
        text: action.payload,
      };
    case NOTI_POSTID:
      return {
        notiInfo: action.payload,
      };
    default:
      return state;
  }
};
export default headerReducer;
