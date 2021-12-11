import axios from "axios";

export const GET_ALL_VOTES = "GET_ALL_VOTES";
export const GET_VOTE = "GET_VOTE";
export const GET_VOTE_ERRORS = "GET_VOTE_ERRORS";

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
        dispatch({ type: GET_VOTE, payload: res.data[0] });
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
