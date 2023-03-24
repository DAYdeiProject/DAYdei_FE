const POST_ID = "calendar/POST_ID";

// action creator
export const throwPostId = (payload) => {
  return {
    type: POST_ID,
    payload: payload,
  };
};

const initialState = {
  getPostId: 0,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ID:
      return {
        getPostId: action.payload,
      };
    default:
      return state;
  }
};
export default calendarReducer;
