import axios from "axios";

export const GET_ALL_VOTES = "GET_ALL_VOTES";
export const GET_VOTE = "GET_VOTE";
export const GET_VOTE_ERRORS = "GET_VOTE_ERRORS";
export const ADD_PROP = "ADD_PROP";
export const VOTE_FOR_PROP = "VOTE_FOR_PROP";
export const END_POLL = "END_POLL";

export const getAllVotes = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/vote`)
      .then((res) => {
        dispatch({ type: GET_ALL_VOTES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getVote = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/vote/${id}`)
      .then((res) => {
        dispatch({ type: GET_VOTE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const createVote = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/vote/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_VOTE_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_VOTE_ERRORS, payload: "" });
        }
      });
  };
};

export const addProp = (id, prop) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/vote/prop/${id}`,
      data: { prop }
    })
      .then((res) => {
        dispatch({ type: ADD_PROP, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};

export const voteForProp = (id, voteId, ip) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/vote/vote/${id}`,
      data: { voteId: voteId, ip: ip}
    })
      .then((res) => {
        dispatch({ type: VOTE_FOR_PROP, payload: { voteId } });
      })
      .catch((err) => console.log(err));
  };
};

export const endPoll = (id, end) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/vote/${id}`,
      data: { end: end}
    })
      .then((res) => {
        dispatch({ type: END_POLL, payload: end });
      })
      .catch((err) => console.log(err));
  };
};
