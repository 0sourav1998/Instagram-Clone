import { apiConnector } from "@/service/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import { authEndpoints } from "@/service/apis";
import { useEffect } from "react";
import { setUserProfile } from "@/redux/slice/userSlice";
import { useParams } from "react-router-dom";


const {GET_PROFILE} = authEndpoints

export const useSetUserProfile = ()=>{
    const {id} = useParams();
    const {token} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const fetchUserProfile = async()=>{
        try{
            const response = await apiConnector("POST",GET_PROFILE,{userId : id},{
                Authorization : `Bearer ${token}`
            })
            if(response?.data?.success){
                dispatch(setUserProfile(response?.data?.user))
            }
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchUserProfile();
    },[])
}