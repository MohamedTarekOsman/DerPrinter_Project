import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import productsReducer from "../reducers/productsReducer";
import authReducer from "../reducers/auth";
import categoriesReducer from "../reducers/categoriesReducer";
import orderesReducer from "../reducers/orderesReducer";
import usersReducer from "../reducers/userReducer";
import slidersReducer from "../reducers/slidersReducer";
import blogsReducer from "../reducers/blogsReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  categories: categoriesReducer,
  orders: orderesReducer,
  sliders: slidersReducer,
  blogs: blogsReducer,
  users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
