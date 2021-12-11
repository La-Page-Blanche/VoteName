import { GET_VOTE } from "../actions/votes.actions";

const initialState = {};

export default function votesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VOTE:
      return action.payload;
    default:
      return state;
  }
}
