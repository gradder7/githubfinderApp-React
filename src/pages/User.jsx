import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";

export default function User() {
  const param = useParams();
  const { singleUser,user } = useContext(GithubContext);
  useEffect(() => {
    singleUser(param.login);
  }, []);

  return <div>User</div>;
}






