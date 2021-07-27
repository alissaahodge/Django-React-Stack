import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_ALL :
      return {
        ...state,
        posts: Object.values(action.payload.data),
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case FETCH_BY_SEARCH :
      return { ...state, posts: Object.values(action.payload) };
    case CREATE :
      return {...state, posts: [...Object.values(state.posts), action.payload]};
    case UPDATE :
      return {
        ...state,
        posts: Object.values(state.posts).map((post) => post._id === action.payload._id ? action.payload : post)
      };
    case DELETE :
      return {...state, posts: Object.values(state.posts).filter((post) => post._id !== action.payload)};
    case LIKE_POST :
      return {
        ...state,
        posts: Object.values(state.posts).map((post) => post._id === action.payload._id ? action.payload : post)
      };
    default:
      return state;
  }

}
