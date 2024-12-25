import useDeleteCartItem from "../../CustomHooks/useDeleteCartItem";
import useDeleteData from "../../CustomHooks/useDeleteData";
import { useGetDataToken } from "../../CustomHooks/useGetData";
import { useInsertDataWithImage } from "../../CustomHooks/useInsertData";
import { useUpdateData } from "../../CustomHooks/useUpdateDate";
import { ADD_ADDRESS, ADD_TO_CART, CLEAR_CART, DELETE_ADDRESS, DELETE_FROM_CART, GET_ERROR, GET_ONE_USER, UPDATE_CART_OPTIONS } from "../types/Types";

export const addToCart=(userId,formData)=>async (dispatch)=>{
    try{
        const response=await useInsertDataWithImage(`/api/v1/user/cart/${userId}`,formData);
        dispatch({
            type:ADD_TO_CART,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

export const addAddress=(userId,formData)=>async (dispatch)=>{
    try{
        const response=await useUpdateData(`/api/v1/user/addAddress/${userId}`,formData);
        dispatch({
            type:ADD_ADDRESS,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

export const deleteAddress=(userId,addressId)=>async (dispatch)=>{
    try{
        const response=await useDeleteData(`/api/v1/user/${userId}/address/${addressId}`);
        dispatch({
            type:DELETE_ADDRESS,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

export const deleteFromCart = (userId,formData) => async (dispatch) => {
    try {
      const response = await useDeleteCartItem(`/api/v1/user/cart/${userId}`,formData);
      dispatch({
        type: DELETE_FROM_CART,
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

export const getUserById=(id)=>async (dispatch)=>{
    try{
        const response=await useGetDataToken(`/api/v1/user/${id}`);
        dispatch({
            type:GET_ONE_USER,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

export const updateCartOptions=(id,formdata)=>async (dispatch)=>{
    try{
        const response=await useUpdateData(`/api/v1/user/cartOptions/${id}`,formdata);
        dispatch({
            type:UPDATE_CART_OPTIONS,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

export const clearCartAndResetUser=(id)=>async (dispatch)=>{
    try{
        const response=await useInsertDataWithImage(`/api/v1/user/clear-cart/${id}`);
        dispatch({
            type:CLEAR_CART,
            payload:response,
            loading:true
        })
    }catch(e){
        dispatch({
            type:GET_ERROR,
            payload: "Error " + e,
        })
    }
}

