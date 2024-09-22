import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedUser : null ,
    onlineUser : [] ,
    messages : [],
}

const chatSlice = createSlice({
    name : "chat",
    initialState ,
    reducers : {
        setSelectedUser : (state,action)=>{
            state.selectedUser = action.payload
        } ,
        setOnlineUser : (state,action)=>{
            state.onlineUser = action.payload
        },
        setMessages : (state,action)=>{
            state.messages = action.payload
        }
    }
})

export const {setSelectedUser,setOnlineUser,setMessages} = chatSlice.actions ;
export default chatSlice.reducer ;