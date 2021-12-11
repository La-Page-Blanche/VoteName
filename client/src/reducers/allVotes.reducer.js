import { GET_ALL_VOTES } from "../actions/votes.actions";

const initialState = {};

export default function allVotesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VOTES:
      return action.payload;
    default:
      return state;
  }
}
