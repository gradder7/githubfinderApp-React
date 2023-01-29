import { createContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import githubReducers from "./GithubReducers";
const GithubContext = createContext();
const github_url = process.env.REACT_APP_GITHUB_URL;

export const GithubProvide = ({ children }) => {
  const initialValue = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducers, initialValue);

  // get intitial user for (testing purpose) only
  //we will search the user
  // const fetchData = async () => {
  //   setLoading();
  //   const response = await fetch(`${github_url}/users`);
  //   // , {
  //   //   // to set the github token in authorization
  //   //   //we include it in header it will send the token with request
  //   //   headers: {
  //   //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //   //   },
  //   // });
  //   const data = await response.json();
  //   // when ever i want to change the state i will call dispach which will triggre action
  //   //and action will check the type and update the state
  //   dispatch({
  //       type:'GET_USERS',
  //       payload:data,
  //   })
  // };

  //get search Users

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${github_url}/search/users?${params}`);
    // desteucture the items from the response
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // get single user on click user
  const singleUser = async (login) => {
    setLoading();
    // const params = useParams();
    const response = await fetch(`${github_url}/users/${login}`);
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${github_url}/users/${login}/repos?${params}`,
    );
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  // clear from user
  const handleClear = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        handleClear,
        singleUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
