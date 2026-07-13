import axios from 'axios';
import { 
    GET_ORDERS_DATA
} from "../types";

export const getOrdersData = (email, status, type) => dispatch => {
    dispatch({
        type: GET_ORDERS_DATA
    })
    axios.post('https://educationsite-production.up.railway.app/api/order/get-orders', {email, status, type})
        .then(res => {
            dispatch({
                type: GET_ORDERS_DATA,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
        })
}