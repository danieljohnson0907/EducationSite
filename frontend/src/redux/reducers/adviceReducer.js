import { isArray } from "../../utils/global";
import { ADD_ADMIN_ADVICE_MESSAGE, ADD_USER_ADVICE_MESSAGE } from "../types";

const initialState = {
    messages: [],
    users: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_USER_ADVICE_MESSAGE:
            let messages = [];
            console.log("---------Action---------", action);
            action.payload.map((item) => {
                if(action.message_type === "initial") {
                    if(
                        (item.sender_email === action.email) ||
                        (item.receiver_email === action.email)
                    ) messages.push(item);
                }
                if(action.message_type === "send" && item.sender_email === action.email) messages.push(item);
                if(action.message_type === "receive" && item.receiver_email === action.email) {
                    messages.push(item);
                }
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