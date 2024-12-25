import { useGetData } from "../../CustomHooks/useGetData";
import {
  useUpdateDataWithImage,
} from "../../CustomHooks/useUpdateDate";
import { useInsertDataWithImage } from "../../CustomHooks/useInsertData";
import {
  CREATE_SLIDER,
  GET_ERROR,
  UPDATE_SLIDER,
  GET_ALL_SLIDERS,
  DELETE_SLIDER,
} from "../types/Types";
import useDeleteData from "../../CustomHooks/useDeleteData";

//update Slider (options and properties)
export const updateSlider = (id, formdata) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/v1/homePage/${id}`,
      formdata
    );

    dispatch({
      type: UPDATE_SLIDER,
      payload: response,
    });

    dispatch(getAllSliders());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error: " + e.message,
    });
  }
};

export const createSlider = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/homePage`, formData);
    dispatch({
      type: CREATE_SLIDER,
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

export const getAllSliders = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_SLIDER", payload: true });

    const response = await useGetData(`/api/v1/homePage`);
    // console.log(response, "API Response");

    dispatch({
      type: GET_ALL_SLIDERS,
      payload: response,
    });

    dispatch({ type: "LOADING_SLIDER", payload: false });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e.message,
    });

    dispatch({ type: "LOADING_SLIDER", payload: false });
  }
};

//delete Slider with id
export const deleteSlider = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/homePage/${id}`);
    dispatch({
      type: DELETE_SLIDER,
      payload: response,
      loading: true,
    });
    dispatch(getAllSliders());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
