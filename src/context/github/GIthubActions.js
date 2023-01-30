const github_url = process.env.REACT_APP_GITHUB_URL;

export const searchUsers = async (text) => {
  //we call setLoading from component
  //   setLoading();
  const params = new URLSearchParams({
    q: text,
  });
  const response = await fetch(`${github_url}/search/users?${params}`);
  // desteucture the items from the response
  const { items } = await response.json();
  // we will dispatch from component
  return items;
};

  export const singleUser = async (login) => {
    // const params = useParams();
    const response = await fetch(`${github_url}/users/${login}`);
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      return data;
    }
  };

     export const getUserRepos = async (login) => {
      const params = new URLSearchParams({
        sort: "created",
        per_page: 10,
      });
      
      const response = await fetch(
        `${github_url}/users/${login}/repos?${params}`
      );
      const data = await response.json();
      //we are dispatching directly from these functions,
      //we will dispatch it from the components
      return data;
    };