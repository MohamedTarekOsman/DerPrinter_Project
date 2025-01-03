import { LOGIN, LOGOUT, REGISTER, AUTH_ERROR, FOREGT_PASSWORD, VERIFY_PASSWORD, RESET_PASSWORD, GET_ERROR } from "../types/Types";
import { useLogin } from "../../CustomHooks/useLogin";
import { useRegister } from "../../CustomHooks/useRegister";
import { useLogout } from "../../CustomHooks/useLogout";
import Cookies from "universal-cookie";
import { useInsertData } from "../../CustomHooks/useInsertData";
import { useUpdateData } from "../../CustomHooks/useUpdateDate";

const cookies = new Cookies();

export const registerUser = (formData) => async (dispatch) => {
  try {
    const response = await useRegister("/api/v1/user/signUp", formData);

    if (response && response.token && response.data) {
      cookies.set("user", response.data, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
      });
      cookies.set("token", response.token, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
      });

      dispatch({
        type: REGISTER,
        payload: response.data,
        loading: false,
      });
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (e) {
    // التعامل مع الأخطاء
    dispatch({
      type: AUTH_ERROR,
      payload: "Error " + e.message || e,
      loading: false,
    });
  }
};
export const registerUserFaceBook = (formData) => async (dispatch) => {
  try {
    const response = await useRegister("/api/v1/user/facebook", formData);

    if (response && response.name && response.email) {
      cookies.set("email", response.email,{
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
      });
      cookies.set("name", response.name, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
      });

      dispatch({
        type: REGISTER,
        payload: response.data,
        loading: false,
      });
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (e) {
    // التعامل مع الأخطاء
    dispatch({
      type: AUTH_ERROR,
      payload: "Error " + e.message || e,
      loading: false,
    });
  }
};

// login user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await useLogin("/api/v1/user/signIn", { email, password });

    if (response && response.token && response.data) {
      // تخزين بيانات المستخدم و الـ Token في الـ Cookies
      cookies.set("user", response.data, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
      });
      cookies.set("token", response.token, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
      });

      dispatch({
        type: LOGIN,
        payload: response.data,
        loading: false,
      });
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Error " + e.message || e,
      loading: false,
    });
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
      payload: null,
      loading: true,
    });

    const response = await useLogout("/api/v1/user/67558db372a9afe40b2abbf4");

    cookies.remove("user", { path: "/" });
    cookies.remove("token", { path: "/" });

    dispatch({
      type: LOGOUT,
      payload: response,
      loading: false,
    });

    window.location.href = "/login";
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Error " + e.message || e,
      loading: false,
    });
  }
};

//1-foregt  passwrod 
export const forgetPassword = (data) => async (dispatch) => {
  try {
      const response = await useInsertData(`/api/v1/user/forgotPassword`, data);
      dispatch({
          type: FOREGT_PASSWORD,
          payload: response,
          loading: true
      })

  } catch (e) {
      dispatch({
          type: GET_ERROR,
          payload: e.response,
      })
  }
}


//2-verify  passwrod 
export const verifyPassword = (data) => async (dispatch) => {
  try {
      const response = await useInsertData(`/api/v1/user/verifyResetCode`, data);
      dispatch({
          type: VERIFY_PASSWORD,
          payload: response,
          loading: true
      })

  } catch (e) {
      dispatch({
          type: GET_ERROR,
          payload: e.response,
      })
  }
}


//2-reset  passwrod 
export const resetPassword = (data) => async (dispatch) => {
  try {
      const response = await useUpdateData(`/api/v1/user/resetPassword`, data);
      dispatch({
          type: RESET_PASSWORD,
          payload: response,
          loading: true
      })

  } catch (e) {
      dispatch({
          type: GET_ERROR,
          payload: e.response,
      })
  }
}
