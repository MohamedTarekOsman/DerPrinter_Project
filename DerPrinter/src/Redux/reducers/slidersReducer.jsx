import {
  CREATE_SLIDER,
  GET_ALL_SLIDERS,
  GET_ERROR,
  DELETE_SLIDER,
  UPDATE_SLIDER,
} from "../types/Types";

const initial = {
  sliders: [],
  allSliders: [],
  createSlideres: [],
  loading: false,
  error: null,
  updateSlider: [],
  deleteSlider: [],
};

const slidersReducer = (state = initial, action) => {
  switch (action.type) {
    case "LOADING_SLIDER":
      return {
        ...state,
        loading: action.payload,
      };

    case GET_ALL_SLIDERS:
      return {
        ...state,
        allSliders: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_SLIDER:
      return {
        ...state,
        updateSlider: action.payload,
        loading: false,
      };

    case CREATE_SLIDER:
      return {
        ...state,
        createSlideres: action.payload,
        loading: false,
      };
    case DELETE_SLIDER:
      return {
        ...state,
        deleteSlider: action.payload,
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

export default slidersReducer;
