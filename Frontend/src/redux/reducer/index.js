import { combineReducers } from '@reduxjs/toolkit'
import userReducer from "../slice/userSlice"
import postReducer from "../slice/postSlice"
import chatReducer from "../slice/chatSlice"
import socketReducer from "../slice/socketSlice"

const rootReducer = combineReducers({
    user : userReducer ,
    post : postReducer ,
    chat : chatReducer ,
    socket : socketReducer
})

export default rootReducer;