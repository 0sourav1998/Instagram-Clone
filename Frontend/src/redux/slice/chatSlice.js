import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedUser : null ,
    onlineUser : []
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
        }
    }
})

export const {setSelectedUser,setOnlineUser} = chatSlice.actions ;
export default chatSlice.reducer ;