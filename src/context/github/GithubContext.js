import { createContext, useState } from "react";

const GithubContext = createContext();

const github_url = process.env.REACT_APP_GITHUB_URL;

export const GithubProvide = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setUsers(data);
    setLoading(false);
  };

  return (
    <GithubContext.Provider value={{ users, loading,
    fetchData }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
