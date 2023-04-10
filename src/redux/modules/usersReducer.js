const OTHER_USER_ID = "userInfo/OTHER_USER_ID";

// action creator
export const otherIdState = (payload) => {
  return {
    type: OTHER_USER_ID,
    payload: payload,
  };
};

const initialState = {
  otherId: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case OTHER_USER_ID:
      return {
        otherId: action.payload,
      };
    default:
      return state;
  }
};
export default usersReducer;
