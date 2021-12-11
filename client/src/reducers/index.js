import { combineReducers } from 'redux';
import votesReducer from './votes.reducer';
import allVotesReducer from './allVotes.reducer';

export default combineReducers({
  votesReducer,
  allVotesReducer
});