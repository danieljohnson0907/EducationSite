import {
    EDIT_PROFILE_INFORMATION,
    EDIT_PROFILE_INFORMATION_LOADING,
    GET_PROFILE_INFORMATION,
    CHARGE_MONEY,
    SET_PROFILE_LOADING
    
} from "../types";

const initialState = {      
    isLoading: false,
    data: {
        name: "",
        email: "",
        birthday: "",
        gender: "man",
        avatar: "",
        balance:"",
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE_INFORMATION:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case EDIT_PROFILE_INFORMATION_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            }
        case EDIT_PROFILE_INFORMATION:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case CHARGE_MONEY:
            // console.log(state.data.balance)
            const balance = Number(state.data.balance) + Number(action.payload)
            return {
                ...state,
                isLoading: false,
                data:{
                    ...state.data,
                    balance: balance
                }
            }
        case SET_PROFILE_LOADING:
            return{
                ...state,
                isLoading: !state.isLoading
            }
        default:
            return state;
    }
}