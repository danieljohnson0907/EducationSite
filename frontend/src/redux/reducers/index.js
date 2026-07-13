import { combineReducers } from 'redux';

import authReducer from './authReducer'
import profileReducer from './profileReducer';
import homeReducer from './homeReducer';
import expertsReducer from './expertsReducer';
import usersReducer from './admin/usersReducer';
import socketReducer from './socketReducer';
import chatReducer from './chatReducer';
import userAdviceReducer from './adviceReducer';
import adminAdviceReducer from './admin/adviceReducer';
import adminExpertsReducer from './admin/expertsReducer';
import blogsReducer from './blogsReducer';
import messagesReducer from './messagesReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
    auth: authReducer,
    profile : profileReducer,
    home: homeReducer,
    experts: expertsReducer,
    admin_users: usersReducer,
    chat: chatReducer,
    socket: socketReducer,
    user_advice: userAdviceReducer,
    admin_advice: adminAdviceReducer,
    blogs: blogsReducer,
    admin_experts: adminExpertsReducer,
    messages: messagesReducer,
    orders: ordersReducer
});