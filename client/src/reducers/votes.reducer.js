import { GET_VOTE, ADD_PROP, VOTE_FOR_PROP, END_POLL } from "../actions/votes.actions";

const initialState = {};

export default function votesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VOTE:
      return action.payload;
    case ADD_PROP:
      return {
        ...state,
        choice: [action.payload.id, ...state.choice],
      };
    case VOTE_FOR_PROP:
      return {
        ...state,
        choice: [action.payload.voteId, ...state.choice],
      };
    case END_POLL:
      return {
        ...state,
        end: action.payload,
      };
    default:
      return state;
  }
}
