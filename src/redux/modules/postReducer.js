const POST_DETAIL = "post/POST_DETAIL";

export const getPostDetail = (payload) => {
  return {
    type: POST_DETAIL,
    payload: payload,
  };
};

const initialState = {
  postDetail: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DETAIL:
      return {
        postDetail: action.payload,
      };
    default:
      return state;
  }
};
export default postReducer;
