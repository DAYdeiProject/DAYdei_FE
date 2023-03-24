const POST_ID = "calendar/POST_ID";
const NOTIFICATION_STATE = "calendar/NOTIFICATION_STATE";
const MESSAGE_STATE = "calendar/MESSAGE_STATE";

// action creator
export const throwPostId = (payload) => {
  return {
    type: POST_ID,
    payload: payload,
  };
};
// 알림아이콘 클릭 여부
export const notificationState = (payload) => {
  return {
    type: NOTIFICATION_STATE,
    payload: payload,
  };
};
// 새알림 메세지 여부
export const messageState = (payload) => {
  return {
    type: MESSAGE_STATE,
    payload: payload,
  };
};

const initialState = {
  getPostId: 0,
  isNotification: "",
  isMessage: "",
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ID:
      return {
        getPostId: action.payload,
      };
    case NOTIFICATION_STATE:
      return {
        isNotification: action.payload,
      };
    case MESSAGE_STATE:
      return {
        isMessage: action.payload,
      };
    default:
      return state;
  }
};
export default calendarReducer;
