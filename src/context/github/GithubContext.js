import { createContext, useReducer } from "react";
import githubReducers from "./GithubReducers";
const GithubContext = createContext();
const github_url = process.env.REACT_APP_GITHUB_URL;

export const GithubProvide = ({ children }) => {
    const initialValue={
        users:[],
        loading:true
    }

  const [state, dispatch] = useReducer(githubReducers,initialValue);

  const fetchData = async () => {
    const response = await fetch(`${github_url}/users`);
    // , {
    //   // to set the github token in authorization
    //   //we include it in header it will send the token with request
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // });
    const data = await response.json();
    dispatch({
        type:'GET_USERS',
        payload:data,
    })
  };

  return (
    <GithubContext.Provider value={{ users:state.users, loading:state.loading, fetchData }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
