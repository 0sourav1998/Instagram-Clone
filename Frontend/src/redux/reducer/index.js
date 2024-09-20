import { combineReducers } from '@reduxjs/toolkit'
import userReducer from "../slice/userSlice"
import postReducer from "../slice/postSlice"

const rootReducer = combineReducers({
    user : userReducer ,
    post : postReducer
})

export default rootReducer;