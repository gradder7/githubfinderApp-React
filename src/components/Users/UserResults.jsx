import React, { useContext, useEffect } from "react";
import GithubContext from "../../context/github/GithubContext";
import Spinner from "../layout/Spinner";
import UsersItems from "./UsersItems";

export default function UserResults() {
  const{users,loading,fetchData} = useContext(GithubContext);

  useEffect(() => {
    fetchData();
  });

  //   if loading true than show loader or data
  return loading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <UsersItems key={user.id} user={user} />
      ))}
    </div>
  );
}



