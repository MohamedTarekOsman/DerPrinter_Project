import { useGetData } from "../../CustomHooks/useGetData";
import { useUpdateData, useUpdateDataWithImage } from "../../CustomHooks/useUpdateDate";
import { useInsertDataWithImage } from "../../CustomHooks/useInsertData";
import {
  CREATE_ORDERS,
  GET_ALL_ORDERS,
  GET_ERROR,
  UPDATE_ORDER,
  UPDATE_ORDER_IMG,
  UPDATE_USER_ORDER_IMG,
} from "../types/Types";

export const getAllOrders = (limit,page) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_ORDER", payload: true });

    const response = await useGetData(`/api/v1/orders?page=${page}&limit=${limit}`);

    dispatch({
      type: GET_ALL_ORDERS,
      payload: response,
    });

    dispatch({ type: "LOADING_ORDER", payload: false });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.message,
    });

    dispatch({ type: "LOADING_ORDER", payload: false });
  }
};

//update Order (options and properties)

export const updateOrder = (id, formdata) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/orders/${id}`, formdata);

    dispatch({
      type: UPDATE_ORDER,
      payload: response.data,
    });

    dispatch(getAllOrders());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error: " + e.message,
    });
  }
};

export const updateImageStatus =
  (orderId, imageId, status) => async (dispatch) => {
    try {
      const response = await useUpdateData(
        `/api/v1/orders/${orderId}/images/${imageId}`,
        { status }
      );
      ;
      dispatch({
        type: UPDATE_ORDER_IMG,
        payload: response.data.order,
      });
    } catch (error) {
      dispatch({
        type: GET_ERROR,
        payload: `Error: ${error.message}`,
      });
    }
  };

  export const updateOrderImage = (orderId, imageId, formdata) => async (dispatch) => {
    try {
      const response = await useUpdateDataWithImage(`/api/v1/orders/${orderId}/images/${imageId}`, formdata);
      dispatch({
        type: UPDATE_USER_ORDER_IMG,
        payload: response.data,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
      });
    }
  };

export const createOrder = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/orders`, formData);
    dispatch({
      type: CREATE_ORDERS,
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
