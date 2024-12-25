import {
  CREATE_BLOG,
  GET_ERROR,
  UPDATE_BLOG,
  GET_ALL_BLOGS,
  DELETE_BLOG,
} from "../types/Types";

const initial = {
  blogs: [],
  allBlogs: [],
  createBlogs: [],
  loading: false,
  error: null,
  updateBlog: [],
  deleteBlog: [],
  success: null,
};

const blogsReducer = (state = initial, action) => {
  switch (action.type) {
    case "LOADING_BLOG":
      return {
        ...state,
        loading: action.payload,
      };

    case GET_ALL_BLOGS:
      return {
        ...state,
        allBlogs: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_BLOG:
      return {
        ...state,
        updateBlog: action.payload,
        loading: false,
      };

    case CREATE_BLOG:
      return {
        ...state,
        createBlogs: action.payload,
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        deleteBlog: action.payload,
        loading: false,
      };

    case GET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default blogsReducer;
