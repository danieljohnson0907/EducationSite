import axios from 'axios';
import { GET_BLOGS, GET_BLOG_COMMENTS } from '../types';
import { notification } from 'antd';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://ed-mybackend-production.up.railway.app/api';

export const getBlogs = () => dispatch => {
    axios.get(`${API_BASE_URL}/blogs/get-blogs`, {})
        .then(res => {
            dispatch({
                type: GET_BLOGS,
                payload: Array.isArray(res.data) ? res.data : []
            });
        })
        .catch(err => {
            console.log(err);
        });
};

let getComment_email = '';

export const getComments = (email) => dispatch => {
    getComment_email = email;

    axios.post(`${API_BASE_URL}/blogs/get-comments`, { email })
        .then(res => {
            dispatch({
                type: GET_BLOG_COMMENTS,
                payload: Array.isArray(res.data) ? res.data : []
            });
        })
        .catch(err => {
            console.log(err);
        });
};

export const postBlog = (data) => dispatch => {
    axios.post(`${API_BASE_URL}/blogs/post-blog`, data)
        .then(res => {
            if (res.data.result === 'success') {
                notification.success({
                    description: 'Posted your blog successfully'
                });

                axios.get(`${API_BASE_URL}/blogs/get-blogs`, {})
                    .then(res => {
                        dispatch({
                            type: GET_BLOGS,
                            payload: Array.isArray(res.data) ? res.data : []
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                notification.error({
                    description: 'Failed'
                });
            }
        })
        .catch(err => {
            console.log(err);
            notification.error({
                description: 'Failed to post blog'
            });
        });
};

export const postComment = (data) => dispatch => {
    axios.post(`${API_BASE_URL}/blogs/post-comment`, { data })
        .then(res => {
            if (res.data.result === 'success') {
                notification.success({
                    description: 'Leave your comment successfully'
                });

                axios.post(`${API_BASE_URL}/blogs/get-comments`, { email: getComment_email })
                    .then(res => {
                        dispatch({
                            type: GET_BLOG_COMMENTS,
                            payload: Array.isArray(res.data) ? res.data : []
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                notification.error({
                    description: 'Failed'
                });
            }
        })
        .catch(err => {
            console.log(err);
            notification.error({
                description: 'Failed to post comment'
            });
        });
};
