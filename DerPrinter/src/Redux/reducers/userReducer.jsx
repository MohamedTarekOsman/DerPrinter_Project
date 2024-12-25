import { ADD_ADDRESS, ADD_TO_CART, CLEAR_CART, DELETE_ADDRESS, DELETE_FROM_CART, GET_ONE_USER, UPDATE_CART_OPTIONS} from "../types/Types";


const initial={
    cart:[],
    deleteFromCart:[],
    oneUser:[],
    address:[],
    deletedAddress:[],
    cartOptions:[],
    clearCart:[],
    loading:true,
}

const usersReducer=(state=initial,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            return {
                ...state,
                cart:action.payload,
                loading:false
            }

        case DELETE_FROM_CART:
            return {
                ...state,
                deleteFromCart:action.payload,
                loading:false
            }

        case GET_ONE_USER:
            return {
                ...state,
                oneUser:action.payload,
                loading:false
            }

        case ADD_ADDRESS:
            return {
                ...state,
                address:action.payload,
                loading:false
            }

        case DELETE_ADDRESS:
            return {
                ...state,
                deletedAddress:action.payload,
                loading:false
            }

        case UPDATE_CART_OPTIONS:
        return {
            ...state,
            cartOptions:action.payload,
            loading:false
        }

        case CLEAR_CART:
        return {
            ...state,
            clearCart:action.payload,
            loading:false
        }
        default:
            return state;
    }
}

export default usersReducer