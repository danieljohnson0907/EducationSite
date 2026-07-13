import axios from 'axios';
import { GET_EXPERTS_SEARCH, SET_EXPERTS_SEARCH_LOADING } from "../types";
import { notification } from 'antd';
import { TO_BE_EXPERT } from '../types';
export const getExpertsSearch = (params) => dispatch => {
    dispatch({
        type: SET_EXPERTS_SEARCH_LOADING
    })
    axios.post('https://educationsite-production.up.railway.app/api/experts/get-search', params)
        .then(res => {
            dispatch({
                type: GET_EXPERTS_SEARCH,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err.response.data);
            const error_msg = err.response.data;
            if (error_msg === "Unauthorized") {
                const args = {
                    description: "Please login",
                };
                notification.error(args)
                // window.location.href = "/";
            }
        })
}
export const ToExpertUser = (userData, history) => dispatch =>{
    axios.post('https://educationsite-production.up.railway.app/api/profile/to_expert',userData)
    .then(res=>{
        const args = {
            message:"Success",
            description: " waiting permission"
        };
        notification.success(args)
    })
    .catch(err=>{
        if(typeof err.response.data ==='object'){
            Object.keys(err.response.data).map((key)=>{
                const args ={
                    message:  key.toUpperCase(),
                    description: err.response.data[key],
                };
                notification.error(args)
            });
        }
        else{
            const args ={
                message: "Server Error",
                description: "Disconnect the Server",
            }
            notification.error(args)
        }
        dispatch({
            type: TO_BE_EXPERT,
            payload: err.response.data
        })
    })
}



