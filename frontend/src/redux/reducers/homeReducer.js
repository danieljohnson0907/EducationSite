import {
    GET_HOME_STATES,
    SET_HOME_STATES_LOADING,
    SET_PAGE_PATH
} from "../types";

const initialState = {
    isLoading : false,
    count: {
        student: 0,
        expert: 0
    },
    recommand: {
        students: [],
        experts: []
    },
    page_path: "/"
}

export default function(state = initialState, action){
    switch (action.type) {
        case SET_PAGE_PATH:
            return {
                ...state,
                page_path: action.payload
            }
        case GET_HOME_STATES:
            return {
                ...state,
                ...action.payload,
                isLoading:false
            }
        case SET_HOME_STATES_LOADING:
            return{
                ...state,
                isLoading: !state.isLoading,
            }
        default :
            return state;
    }
}