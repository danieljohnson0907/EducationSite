import {
    GET_BLOGS,
    GET_BLOG_COMMENTS,
} from '../types';

const initialState = {
    data: [],
    comments: [],
};

function sortByCreateAt(payload) {
    return [...(Array.isArray(payload) ? payload : [])].sort(function (a, b) {
        return (new Date(b.create_at)).getTime() - (new Date(a.create_at)).getTime();
    });
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BLOGS:
            return {
                ...state,
                data: sortByCreateAt(action.payload)
            };

        case GET_BLOG_COMMENTS:
            return {
                ...state,
                comments: sortByCreateAt(action.payload)
            };

        default:
            return state;
    }
}
