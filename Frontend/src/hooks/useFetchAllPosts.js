import { apiConnector } from "@/service/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import { postEndpoints } from "@/service/apis";
import { useEffect } from "react";
import { setAllPosts } from "@/redux/slice/postSlice";

const {FETCH_ALL_POST} = postEndpoints

export const useFetchAllPosts = ()=>{
    const {token} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const {allPost,selectedPost} = useSelector((state)=>state.post)
    const fetchPost = async()=>{
        try{
            const response = await apiConnector("GET",FETCH_ALL_POST,null,{
                Authorization : `Bearer ${token}`
            })
            if(response?.data?.success){
                dispatch(setAllPosts(response?.data?.posts))
            }
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchPost();
    },[allPost,selectedPost?.comments])
}