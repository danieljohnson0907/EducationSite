import axios from 'axios';
import { GET_PROFILE_INFORMATION, EDIT_PROFILE_INFORMATION_LOADING, } from "../types";
import { notification } from 'antd';
import { 
    SET_PROFILE_LOADING ,
    CHARGE_MONEY,
} from "../types";

export const getInformation = (email) => dispatch => {
    dispatch({
        type: EDIT_PROFILE_INFORMATION_LOADING
    })
    console.log(email)
    axios.post('https://educationsite-production.up.railway.app/api/profile/get-information', {email})
        .then(res => {
            dispatch({
                type: GET_PROFILE_INFORMATION,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
        })
}

export const editInformation = (user_data, email) => dispatch => {
    dispatch({
        type: EDIT_PROFILE_INFORMATION_LOADING
    })
    return axios.post('https://educationsite-production.up.railway.app/api/profile/edit-information', {
        email,
        user_data
    })
        .then(res => {
            if(res.data.result === "failed") {
                notification.error({
                    description: "Failed update"
                })
            } else {
                notification.success({
                    description: "Updated successfully"
                })
            }
        })
        .catch(err => {
            notification.error({
                description: "Server error"
            })
        })
}
export const chargeMoney = (balance) =>dispatch =>{
    dispatch({
        type: SET_PROFILE_LOADING
    })
    axios.post('https://educationsite-production.up.railway.app/api/profile/charge-money', {balance})
    .then(res => {
        console.log(res.data)
        if(res.data.success){
            const args = {
                message: "Success",
                description: "Edit successfully",
            };
            notification.success(args)
            dispatch({
                type:CHARGE_MONEY,
                payload: balance
                
            })
        }
        else{
            dispatch({
                type: SET_PROFILE_LOADING
            })
            const args = {
                message: "Failed",
                description: "Edit failed",
            };
            notification.error(args)
        }
        // history.push('/login');
    })
}


export const sendReviewRate = (reviewRate) => dispatch=> {
    axios.put(
        'https://educationsite-production.up.railway.app/api/profile/review-rate',
        {reviewRate}
    )
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}