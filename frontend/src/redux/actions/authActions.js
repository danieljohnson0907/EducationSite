import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from "../types";
import {setAuthToken} from '../../utils/setAuthToken'

import jwt_decode from 'jwt-decode';
import { notification } from 'antd';


export const registerUser = (data, history) => dispatch=> { 
    axios.post('https://educationsite-production.up.railway.app//api/users/auth/register', data)
        .then(res => {
            const args = {
                message: "Success",
                description: "Registered successfully",
            };
            notification.success(args)
            // history.push('/login');
        })
        .catch(err=>{
            console.log(err)
            if (typeof err.response.data === 'object') {
                Object.keys(err.response.data).map((key) => {
                const args = {
                    message:  key.toUpperCase(),
                    description: err.response.data[key],
                };
                notification.error(args)
                });
            }
            else {
                const args = {
                    message: 'Server Error',
                    description: 'Disconnect the Server',
                };
                notification.error(args)
            }
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
            })
        })
}

export const loginUser = (userData) => dispatch => {
    axios.post('https://educationsite-production.up.railway.app/api/users/auth/login', userData)
        .then(res => {
            const args = {
                message: "Success",
                description: "Login successfully",
            };
            notification.success(args)
            // console.log(res)
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            // getProfile()(dispatch)
        })      
        .catch(err => {
            if (typeof err.response.data === 'object') {
                Object.keys(err.response.data).map((key) => {
                const args = {
                    message:  key.toUpperCase(),
                    description: err.response.data[key],
                };
                notification.error(args)
                });
            }
            else {
                const args = {
                    message: 'Server Error',
                    description: 'Disconnect the Server',
                };
                notification.error(args)
            }
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
            })
        })

}
export const orderUser = (userData, history) => dispatch=> {
    console.log(userData)
    axios.post('https://educationsite-production.up.railway.app/api/order',userData)
        .then(res => {
            const args = {
                message: "Success",
                description: "Order successfully",
            };
            notification.success(args)
            // history.push('/login');
        })
        .catch(err=>{
            console.log(err)
            if (typeof err.response.data === 'object') {
                Object.keys(err.response.data).map((key) => {
                const args = {
                    message:  key.toUpperCase(),
                    description: err.response.data[key],
                };
                notification.error(args)
                });
            }
            else {
                const args = {
                    message: 'Server Error',
                    description: 'Disconnect the Server',
                };
                notification.error(args)
            }
            dispatch({
                type : GET_ERRORS,
                payload : err.response.data
            })
        })
}


export const setCurrentUser = (decoded) => {
    return {
        type : SET_CURRENT_USER,
        payload : decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser(null));
    const args = {
        message: "Success",
        description: "Logged out successfully",
    };
    notification.success(args)
}