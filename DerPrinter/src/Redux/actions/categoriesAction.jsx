import { useGetData } from "../../CustomHooks/useGetData";
import { useInsertDataWithImage } from "../../CustomHooks/useInsertData";
import useDeleteData from "../../CustomHooks/useDeleteData";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ALL_CATEGORIES,
  GET_ERROR,
  UPDATE_CATEGORY,
} from "../types/Types";
import toast from "react-hot-toast";
import { useUpdateDataWithImage } from "../../CustomHooks/useUpdateDate";

//update Category (options and properties)
export const updateCategory = (id, formdata) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/v1/categories/${id}`,
      formdata
    );
    dispatch({
      type: UPDATE_CATEGORY,
      payload: response.data,
      loading: true,
    });

    console.log("response", response);
    toast.success("dd updated successfully!");
    dispatch(getAllCategories());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//create Category
export const createCategory = (formData, onSuccess) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      "/api/v1/categories",
      formData
    );
    dispatch({
      type: CREATE_CATEGORY,
      payload: response,
    });
    toast.success("Category created successfully!");

    dispatch(getAllCategories());

    if (onSuccess) onSuccess();
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: error.response
        ? error.response.data.message
        : "An error occurred",
    });
    console.error("Failed to create category:", error);
  }
};

//get all Categories
export const getAllCategories = () => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/categories`);
    dispatch({
      type: GET_ALL_CATEGORIES,
      payload: response.data,
      loading: false,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.message,
    });
  }
};

//delete Category with id
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: response.data,
      loading: true,
    });
    dispatch(getAllCategories());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
