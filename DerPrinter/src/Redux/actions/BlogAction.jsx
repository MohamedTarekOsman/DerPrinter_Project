import { useGetData } from "../../CustomHooks/useGetData";
import {
  useUpdateDataWithImage,
} from "../../CustomHooks/useUpdateDate";
import { useInsertDataWithImage } from "../../CustomHooks/useInsertData";
import {
  CREATE_BLOG,
  GET_ERROR,
  UPDATE_BLOG,
  GET_ALL_BLOGS,
  DELETE_BLOG,
} from "../types/Types";
import useDeleteData from "../../CustomHooks/useDeleteData";

//update Blog (options and properties)
export const updateBlog = (id, formdata) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/v1/blogs/${id}`,
      formdata
    );

    dispatch({
      type: UPDATE_BLOG,
      payload: response,
    });

    dispatch(getAllBlogs());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error: " + e.message,
    });
  }
};

export const createBlog = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/blogs`, formData);
    dispatch({
      type: CREATE_BLOG,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_Blog", payload: true });

    const response = await useGetData(`/api/v1/blogs`);
    // ;

    dispatch({
      type: GET_ALL_BLOGS,
      payload: response,
    });

    dispatch({ type: "LOADING_Blog", payload: false });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.message,
    });

    dispatch({ type: "LOADING_Blog", payload: false });
  }
};

//delete Blog with id
export const deleteBlog = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/blogs/${id}`);
    dispatch({
      type: DELETE_BLOG,
      payload: response,
      loading: true,
    });
    dispatch(getAllBlogs());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
