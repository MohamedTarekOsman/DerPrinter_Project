import { CREATE_PRODUCTS, DELETE_PRODUCTS, GET_ALL_PRODUCTS, GET_ONE_PRODUCT, UPDATE_PRODUCTS } from "../types/Types";


const initial={
    products:[],
    allProducts:[],
    oneProduct:[],
    updateProducts:[],
    deleteProducts:[],
    loading:true,
}

const productsReducer=(state=initial,action)=>{
    switch(action.type){
        case CREATE_PRODUCTS:
            return {
                ...state,
                products:action.payload,
                loading:false
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts:action.payload,
                // allProducts: Array.isArray(action.payload) ? action.payload : [],
                loading:false
            }
        case GET_ONE_PRODUCT:
            return {
                ...state,
                oneProduct:action.payload,
                loading:false
            }
        case UPDATE_PRODUCTS:
            return {
                ...state,
                updateProducts:action.payload,
                loading:false
            }
        case DELETE_PRODUCTS:
            return {
                ...state,
                deleteProducts:action.payload,
                loading:false
            }
        default:
            return state;
    }
}

export default productsReducer
