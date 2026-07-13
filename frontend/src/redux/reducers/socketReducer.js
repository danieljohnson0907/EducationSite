import { SET_SOCKET } from "../types";

const initialState = {
    socket: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_SOCKET:
            return{
                ...state,
                socket : action.payload
            }
        default:{
            return state;
        }
    }
}