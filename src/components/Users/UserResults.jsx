import React, { useEffect, useState } from "react";

export default function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      // to set the github token in authorization
      //we include it in header it will send the token with request
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  //   if loading true than show loader or data
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="grid grid-col-1 gap-8 xl:grid-col-4 lg:grid-col-3 md:grid-col-2">
      {users.map((user,index) => {
        return <h1 key={'user'+index}>{user.login}</h1>;
      })}
    </div>
  );
}
