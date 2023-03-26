const NOTIFICATION_STATE = "calendar/NOTIFICATION_STATE";
const MESSAGE_STATE = "calendar/MESSAGE_STATE";

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
  isNotification: "",
  isMessage: "",
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
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
