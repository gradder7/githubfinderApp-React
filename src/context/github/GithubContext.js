import { createContext, useReducer } from "react";
import githubReducers from "./GithubReducers";
const GithubContext = createContext();

export const GithubProvide = ({ children }) => {
  const initialValue = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducers, initialValue);

  // clear from user
  // const handleClear = () => {
  //   dispatch({
  //     type: "CLEAR_USERS",
  //   });
  // };

  return (
    <GithubContext.Provider
      value={{
        // users: state.users,
        // loading: state.loading,
        // user: state.user,
        // repos: state.repos,
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
