import axios from 'axios';
import { ADMIN_GET_USERS, GET_BLOGS } from '../../types';
let ROLE = 0;
export const getUsers = (role) => dispatch => {
    ROLE = role;
    axios.post('https://educationsite-production.up.railway.app/api/admin/users/get-users', { role })
        .then(res => {
            dispatch({
                type: ADMIN_GET_USERS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
        })
}

export const getBlogs = () => dispatch => {
    axios.get('https://educationsite-production.up.railway.app/api/blogs/get-blogs', { })
        .then(res => {
            dispatch({
                type: GET_BLOGS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
        })
}


export const changeType = (email, blog_id) => dispatch => {
    axios.post('https://educationsite-production.up.railway.app/api/admin/users/change-type', { email, blog_id })
        .then(res => {
            axios.post('https://educationsite-production.up.railway.app/api/admin/users/get-users', { role: ROLE })
                .then(res => {
                    dispatch({
                        type: ADMIN_GET_USERS,
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
