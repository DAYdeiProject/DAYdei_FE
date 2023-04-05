const COMMENT = "notFound/COMMENT";

// action creator
export const setComment = (payload) => {
  return {
    type: COMMENT,
    payload: payload,
  };
};

const initialState = {
  data: "",
};

const notFoundReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT:
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};
export default notFoundReducer;
