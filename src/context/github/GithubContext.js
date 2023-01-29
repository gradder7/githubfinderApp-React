import { createContext, useReducer } from "react";
import githubReducers from "./GithubReducers";
const GithubContext = createContext();
const github_url = process.env.REACT_APP_GITHUB_URL;

export const GithubProvide = ({ children }) => {
  const initialValue = {
    users: [],
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

  const setLoading = () =>
  dispatch({
    type: "SET_LOADING",
  });
  
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
        searchUsers,
        handleClear,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
