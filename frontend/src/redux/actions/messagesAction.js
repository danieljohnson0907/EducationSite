import { notification } from "antd"
import { GET_MESSAGES_USERS, SET_SOCKET, ADD_MESSAGES_DATA } from "../types"
import { socket } from "./socketAction"
export const initialSocket = (email) => dispatch => {
    socket.emit('set_userId', { email })
    socket.on('connected', function (first) {
        console.log(first)
    })
    dispatch({
        type: SET_SOCKET,
        payload: socket
    })
    socket.emit('get_messages_users', { 
        email
    });
    socket.on('get_messages_users', (data) => {
        const user_email = data.email;
        if(user_email === email)
            dispatch({
                type: GET_MESSAGES_USERS,
                payload: data.result
            })
    })
    socket.on('send_message', (result) => {
        dispatch({
            type: ADD_MESSAGES_DATA,
            payload: [result],
            sender_email: email,
            receiver_email: email,
            message_type: "receive"
        })
        document.getElementById('chatground_messages').scrollTop = document.getElementById('chatground_messages').scrollHeight - document.getElementById('chatground_messages').clientHeight
    })
    socket.on('accept_order', (result) => {
        socket.emit('get_messages_users', { 
            email
        });
    });
    socket.on('complete_order', (result) => {
        socket.emit('get_messages_users', { 
            email
        });
    });
}

export const completeOrder = (order_id) => dispatch => {
    socket.emit('complete_order', {order_id});
}

export const getMessagesData = (sender_email, receiver_email) => dispatch => {
    socket.emit('get_messages_data', { sender_email, receiver_email });
    socket.on('get_messages_data', (result) => {
        dispatch({
            type: ADD_MESSAGES_DATA,
            payload: result,
            sender_email,
            receiver_email,
            message_type: "initial"
        })
        document.getElementById('chatground_messages').scrollTop = document.getElementById('chatground_messages').scrollHeight - document.getElementById('chatground_messages').clientHeight
    })
}

export const sendMessage = (sender_email, receiver_email, message, order_id) => dispatch => {
    dispatch({
        type: ADD_MESSAGES_DATA,
        payload: [{
            message: message,
            sender_email,
            receiver_email,
            order_id
        }],
        sender_email,
        receiver_email,
        message_type: "send"
    });
    socket.emit('send_message', {
        sender_email,
        receiver_email,
        message,
        order_id
    })
}

export const sendOrder = (data) => dispatch => {
    socket.on('connected', function (first) {
    })
    socket.emit("send_order", {
        data
    })
    socket.on("send_order", function(result) {
        if(result === "success") {
            notification.success({
                description: "Please wait until the expert who you hired accept your order. Please check the message."
            })
        } else if(result === "existed_order") {
            notification.error({
                description: "You have a running order."
            })
        }
    })
}

export const acceptOrder = (order_id) => dispatch => {
    socket.emit('accept_order', {order_id});
}

export const getUsers = (email) => dispatch => {
    socket.emit('get_messages_users', {email});
    // socket.emit('get_admin_advice_messages', { sender_email, receiver_email });
    // socket.on('get_admin_advice_messages', (result) => {
    //     dispatch({
    //         type: ADD_ADMIN_ADVICE_MESSAGE,
    //         payload: result,
    //         sender_email,
    //         receiver_email,
    //         message_type: "initial"
    //     })
    //     document.getElementById('chatground_messages').scrollTop = document.getElementById('chatground_messages').scrollHeight - document.getElementById('chatground_messages').clientHeight
    // })
}
