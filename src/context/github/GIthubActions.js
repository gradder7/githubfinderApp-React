import axios from "axios";
const github_url = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: github_url,
  // headers:{}
});
export const searchUsers = async (text) => {
  //we call setLoading from component
  //   setLoading();
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  //we dont need to make again the response.json(),
  //this will give us the data,
  return response.data.items;

  //   const response = await fetch(`${github_url}/search/users?${params}`);
  //   // desteucture the items from the response
  //   const { items } = await response.json();
  //   // we will dispatch from component
  //   return items;
};

//get user and repos
export const getUserAndRepos = async (login) => {
  // promise.all takes the array of promises and
  //,give the value as result in array from
  //if one rejects than shows error
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return {user:user.data,repos:repos.data}
};

// for single user and repos we will have a single function
// export const singleUser = async (login) => {
//   // const params = useParams();
//   const response = await fetch(`${github_url}/users/${login}`);
//   if (response.status === 404) {
//     window.location = "/notfound";
//   } else {
//     const data = await response.json();
//     return data;
//   }
// };

// export const getUserRepos = async (login) => {
//   const params = new URLSearchParams({
//     sort: "created",
//     per_page: 10,
//   });

//   const response = await fetch(`${github_url}/users/${login}/repos?${params}`);
//   const data = await response.json();
//   //we are dispatching directly from these functions,
//   //we will dispatch it from the components
//   return data;
// };
