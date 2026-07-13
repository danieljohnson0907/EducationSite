import { ADMIN_GET_EXPERTS } from '../../types';

const initialState = {
    experts : [],
}

export default function(state = initialState, action){
    switch (action.type) {
        case ADMIN_GET_EXPERTS:   
            return {
                ...state,
                experts : action.payload
            }
        default :
            return state;   
    }
}