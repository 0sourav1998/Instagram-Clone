import { apiConnector } from "../apiConnector"
import { postEndpoints } from "../apis"

const {CREATE_POST,DELETE_POST,LIKE_DISLIKE,COMMENT_ON_POSTS} = postEndpoints

export const addPost = async(body,token)=>{
    let result ;
    try {
        const response = await apiConnector("POST",CREATE_POST,body,{
            Authorization : `Bearer ${token}`
        });
        if(response?.data?.success){
            result = response?.data?.createdPost
        }
    } catch (error) {
        console.log(error.message)   
    }
    return result ;
}

export const deletePost = async(body,token)=>{
    try {
        const response = await apiConnector("DELETE",DELETE_POST,body,{
            Authorization : `Bearer ${token}`
        });
        if(response?.data?.success){
            return response ;
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const likeOrDislikePost = async(body,token)=>{
    try {
        const response = await apiConnector("POST",LIKE_DISLIKE,body,{
            Authorization : `Bearer ${token}`
        });
        if(response?.data?.success){
            return response ;
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const commentOnPosts = async(body,token)=>{
    try {
        const response = await apiConnector("POST",COMMENT_ON_POSTS,body,{
            Authorization : `Bearer ${token}`
        });
        if(response?.data?.success){
            return response ;
        }
    } catch (error) {
        console.log(error.message)
    }
}