import { ADD_ADMIN_ADVICE_MESSAGE, GET_ADVICE_USERS, SET_SOCKET } from "../../types"
import { socket } from "../socketAction"
export const initialSocket = (email) => dispatch => {
    socket.emit('set_userId', { email })
    socket.off('connected')
    socket.on('connected', function (first) {
        console.log(first)
    })
    dispatch({
        type: SET_SOCKET,
        payload: socket
    })
    socket.emit('get_advice_users', { email });
    socket.off('get_advice_users')
    socket.on('get_advice_users', (result) => {
        dispatch({
            type: GET_ADVICE_USERS,
            payload: result
        })
    })

    socket.off('send_advice_message')
    socket.on('send_advice_message', (result) => {
        dispatch({
            type: ADD_ADMIN_ADVICE_MESSAGE,
            payload: [result],
            sender_email: email,
            receiver_email: email,
            message_type: "receive"
        })
        document.getElementById('chatground_advice').scrollTop = document.getElementById('chatground_advice').scrollHeight - document.getElementById('chatground_advice').clientHeight
    })
}

export const getAdviceMessages = (sender_email, receiver_email) => dispatch => {
    socket.emit('get_admin_advice_messages', { sender_email, receiver_email });
    socket.off('get_admin_advice_messages')
    socket.on('get_admin_advice_messages', (result) => {
        dispatch({
            type: ADD_ADMIN_ADVICE_MESSAGE,
            payload: result,
            sender_email,
            receiver_email,
            message_type: "initial"
        })
        document.getElementById('chatground_advice').scrollTop = document.getElementById('chatground_advice').scrollHeight - document.getElementById('chatground_advice').clientHeight
    })
}

export const sendAdminAdvice = (sender_email, receiver_email, message) => dispatch => {
    dispatch({
        type: ADD_ADMIN_ADVICE_MESSAGE,
        payload: [{
            message: message,
            sender_email,
            receiver_email
        }],
        sender_email,
        receiver_email,
        message_type: "send"
    });
    socket.emit('send_admin_advice_message', {
    sender_email,
        receiver_email,
        message
    })
}