import {
    GET_EXPERTS_SEARCH,
    SET_EXPERTS_SEARCH_LOADING
} from "../types";

const initialState = {
    isLoading : false,
    data: [],
    user_data:[],
    current_data:[],
    past_data: [],
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_EXPERTS_SEARCH:
            return {
                ...state,
                ...action.payload,
                isLoading:false
            }
        case SET_EXPERTS_SEARCH_LOADING:
            return{
                ...state,
                isLoading: !state.isLoading,
            }
        default :
            return state;
    }
}