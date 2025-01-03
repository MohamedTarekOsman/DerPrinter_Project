import { LOGIN, LOGOUT, REGISTER, AUTH_ERROR, FOREGT_PASSWORD, VERIFY_PASSWORD, RESET_PASSWORD } from "../types/Types";

const initial = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  forgetPassword:[],
  verifyPassword:[],
  resetPassword:[],
};

const authReducer = (state = initial, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case FOREGT_PASSWORD:
          return {
              ...state,
              forgetPassword: action.payload,
          }
      case VERIFY_PASSWORD:
          return {
              ...state,
              verifyPassword: action.payload,
          }
      case RESET_PASSWORD:
          return {
              ...state,
              resetPassword: action.payload,
          }
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
