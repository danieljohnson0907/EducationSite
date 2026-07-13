import axios from 'axios';
import { SET_HOME_STATES_LOADING, GET_HOME_STATES, SET_PAGE_PATH } from "../types";
export const getHomeStates = () => dispatch => {
    dispatch({
        type: SET_HOME_STATES_LOADING
    })
    axios.get('https://ed-mybackend-production.up.railway.app/api/home/get-states', {})
        .then(res => {
            dispatch({
                type: GET_HOME_STATES,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err)
        })
}

export const setPagePath = (path) => dispatch => {
    localStorage.setItem("page_path", path);
    dispatch({
        type: SET_PAGE_PATH,
        payload: path
    })
}
