import axios from 'axios';
import { ADMIN_GET_EXPERTS } from '../../types';
import { notification } from 'antd';
let searchForm = {};
export const getExperts = (data) => dispatch => {
    searchForm = data;
    axios.post('https://educationsite-production.up.railway.app/api/admin/experts', { data })
        .then(res => {
            dispatch({
                type: ADMIN_GET_EXPERTS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
        })
}

export const allowExpert = (email) => dispatch => {
    axios.post('https://educationsite-production.up.railway.app/api/admin/experts/allow-expert', { email })
        .then(res => {
            if (res.result === "failed") {
                notification.error({
                    description: "Operation was failed"
                })
            } else {
                notification.success({
                    description: "Operation was successed"
                });
                getExperts(searchForm);
            }
            axios.post('https://educationsite-production.up.railway.app/api/admin/experts', { data:searchForm })
                .then(res => {
                    dispatch({
                        type: ADMIN_GET_EXPERTS,
                        payload: res.data
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
}