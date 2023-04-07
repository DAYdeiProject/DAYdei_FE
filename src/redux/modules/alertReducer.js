const ALERT_STATE = "alert/ALERT_STATE";

export const alertState = (payload) => {
  return {
    type: ALERT_STATE,
    payload: payload,
  };
};

const initialState = {
  state: {},
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_STATE:
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};
export default alertReducer;
