import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  UPDATE_CATEGORY,
} from "../types/Types";

const initial = {
  categories: [],
  allCategories: [],
  updateCategories: [],
  deleteCategories: [],
  loading: false,
};

const categoriesReducer = (state = initial, action) => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        updateCategories: action.payload,
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        deleteCategories: action.payload,
        loading: false,
      };
    case "LOADING_CATEGORY":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
