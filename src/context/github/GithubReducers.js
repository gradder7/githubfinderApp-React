const githubReducers = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
        return {
            ...state,
            users:action.payload,
            loading:false,
        }
      break;

    default:
      return state;
      break;
  }
};
export default githubReducers;
