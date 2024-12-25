import {
  CREATE_ORDERS,
  GET_ALL_ORDERS,
  GET_ERROR,
  UPDATE_ORDER,
  UPDATE_ORDER_IMG,
  UPDATE_USER_ORDER_IMG,
} from "../types/Types";

const initial = {
  orders: [],
  allOrders: [],
  createOrder: [],
  loading: false,
  error: null,
  updateOrder: [],
  updateOrderImg: [],
  userOrderImage: []
};

const ordersReducer = (state = initial, action) => {
  switch (action.type) {
    case "LOADING_ORDER":
      return {
        ...state,
        loading: action.payload,
      };

    case GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_ORDER:
      return {
        ...state,
        updateOrder: action.payload,
        loading: false,
      };

    case UPDATE_ORDER_IMG:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };

    case CREATE_ORDERS:
      return {
        ...state,
        createOrder: action.payload,
        loading: false,
      };

      case UPDATE_USER_ORDER_IMG:
      return {
        ...state,
        userOrderImage: action.payload,
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

export default ordersReducer;
