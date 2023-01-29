import React from "react";
import UserResults from "../components/Users/UserResults";
import UserSearch from "../components/Users/UserSearch";

export default function Home() {
  return (
  <>
  {/* search component */}
  <UserSearch/>
  <UserResults/>
  </>)
}
