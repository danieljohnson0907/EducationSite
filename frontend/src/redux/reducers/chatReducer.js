import { GET_CONVERSATION } from "../types"

const initialState = {
    messages: [],
    users: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONVERSATION:
            return {
                ...state,
                conversation: action.payload.result,
                users: action.payload.users
            }
        default:
            return state;
    }
}