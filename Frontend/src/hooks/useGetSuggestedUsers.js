import { apiConnector } from "@/service/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import { authEndpoints } from "@/service/apis";
import { useEffect } from "react";
import { setSuggestedUsers } from "@/redux/slice/userSlice";

const {SUGGESTED_USER} = authEndpoints

export const useGetSuggestedUsers = ()=>{
    const {token} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const fetchSuggestedUsers = async()=>{
        try{
            const response = await apiConnector("POST",SUGGESTED_USER,null,{
                Authorization : `Bearer ${token}`
            })
            if(response?.data?.success){
                dispatch(setSuggestedUsers(response?.data?.suggestedUser))
            }
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchSuggestedUsers();
    },[])
}