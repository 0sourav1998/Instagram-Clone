import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token : null,
    user : null ,
    suggestedUsers : [] ,
    userProfile : null 
}

const userSlice = createSlice({
    name : "user",
    initialState ,
    reducers : {
        setToken : (state,action)=>{
            state.token = action.payload
        } ,
        setUser : (state,action)=>{
            state.user = action.payload
        } , 
        setSuggestedUsers : (state,action)=>{
            state.suggestedUsers = action.payload
        } ,
        setUserProfile : (state,action)=>{
            state.userProfile = action.payload
        }
    }
})

export const {setToken,setUser,setSuggestedUsers,setUserProfile} = userSlice.actions ;
export default userSlice.reducer ;