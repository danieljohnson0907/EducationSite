import { ADD_MESSAGES_DATA, GET_MESSAGES_USERS } from "../types";

const initialState = {
    messages: [],
    users: [],
    information: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case ADD_MESSAGES_DATA:
            let messages = [];
            action.payload.map((item) => {
                if(action.message_type === "initial") {
                    if(
                        (item.sender_email === action.sender_email && item.receiver_email === action.receiver_email) ||
                        (item.sender_email === action.receiver_email && item.receiver_email === action.sender_email)
                    ) messages.push(item);
                }
                if(action.message_type === "send" && action.sender_email === item.sender_email) messages.push(item);
                if(action.message_type === "receive" && action.receiver_email === item.receiver_email) messages.push(item);
            })
            if(action.message_type != "initial") messages = state['messages'].concat(messages);
            messages.sort(function(a, b){
                return (new Date(a.create_at)).getTime() - (new Date(b.create_at)).getTime()
            });
            return {
                ...state,
                messages,
            }
        default:
            return state;
    }
}