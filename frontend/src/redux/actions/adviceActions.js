import { ADD_USER_ADVICE_MESSAGE, SET_SOCKET } from "../types"
import { socket } from "./socketAction"
export const initialSocket = (email) => dispatch => {
    // socket.emit('connection')
    socket.emit('set_userId',{email})
    socket.on('connected', function(first){
        console.log(first)
    })
    dispatch({
        type: SET_SOCKET,
        payload : socket 
    })
    socket.emit('get_user_advice_messages', { email });
    socket.on('get_user_advice_messages', function(data) {
        dispatch({
            type: ADD_USER_ADVICE_MESSAGE,
            payload: data,
            message_type: "initial",
            email
        })
    })
    socket.on('send_advice_message', (result) => {
        dispatch({
            type: ADD_USER_ADVICE_MESSAGE,
            payload: [result],
            email,
            message_type: "receive"
        })
        document.getElementById('chatground').scrollTop = document.getElementById('chatground').scrollHeight - document.getElementById('chatground').clientHeight
    })
}
export const sendUserAdvice = (data) => dispatch =>{
    dispatch({
        type: ADD_USER_ADVICE_MESSAGE,
        payload: [{
            message: data.message,
            sender_email: data.email
        }],
        email: data.email,
        message_type: "send"
    })  ;
    socket.emit('send_user_advice_message', {
        message: data.message,
        email: data.email,
    }) 
}