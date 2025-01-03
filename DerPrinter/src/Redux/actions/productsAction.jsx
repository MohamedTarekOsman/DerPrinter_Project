import { useGetData} from "../../CustomHooks/useGetData";
import { useInsertDataWithImage } from "../../CustomHooks/useInsertData";
import { useUpdateDataWithImage } from "../../CustomHooks/useUpdateDate";
import  useDeleteData  from "../../CustomHooks/useDeleteData";
import { CREATE_PRODUCTS, DELETE_PRODUCTS, GET_ALL_PRODUCTS, GET_ERROR, GET_ONE_PRODUCT, UPDATE_PRODUCTS } from "../types/Types";

//create product 
export const createProduct=(formData)=>async (dispatch)=>{
    try{
        const response=await useInsertDataWithImage(`/api/v1/products`,formData);
        dispatch({
            type:CREATE_PRODUCTS,
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

//get all products 
export const getAllProducts=()=>async (dispatch)=>{
    try{
        const response=await useGetData(`/api/v1/products`);
        dispatch({
            type:GET_ALL_PRODUCTS,
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

export const getProductById=(id)=>async (dispatch)=>{
    try{
        const response=await useGetData(`/api/v1/products/${id}`);
        dispatch({
            type:GET_ONE_PRODUCT,
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

//update product (options and properties)
export const updateProduct=(id,formdata)=>async (dispatch)=>{
    try{
        const response=await useUpdateDataWithImage(`/api/v1/products/${id}`,formdata);
        dispatch({
            type:UPDATE_PRODUCTS,
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

//delete product with id
export const deleteProduct=(id)=>async (dispatch)=>{
    try{
        const response=await useDeleteData(`/api/v1/products/${id}`);
        dispatch({
            type:DELETE_PRODUCTS,
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