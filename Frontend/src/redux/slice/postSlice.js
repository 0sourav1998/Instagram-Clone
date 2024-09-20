import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    post : [] ,
    allPost : [] ,
    selectedPost : null
}

const postSlice = createSlice({
    name : "post",
    initialState ,
    reducers : {
        setPost : (state,action)=>{
            state.post = action.payload
        } ,
        setAllPosts : (state,action)=>{
            state.allPost = action.payload;
        } ,
        setSelectedPost : (state,action)=>{
            state.selectedPost = action.payload
        }
    }
})

export const {setPost , setAllPosts , setSelectedPost} = postSlice.actions ;
export default postSlice.reducer ;