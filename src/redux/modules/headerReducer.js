const TEXT_STATE = "header/TEXT_STATE";

// action creator
export const textState = (payload) => {
  console.log("payload------------", payload);
  return {
    type: TEXT_STATE,
    payload: payload,
  };
};

const initialState = {
  data: "home",
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEXT_STATE:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};
export default headerReducer;
