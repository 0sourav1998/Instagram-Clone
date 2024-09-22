import { apiConnector } from "@/service/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {messageEndpoints} from "../service/apis"
import { setMessages } from "@/redux/slice/chatSlice";

const {GET_ALL_MESSAGES} = messageEndpoints

export const useGetAllMessages = ()=>{
    const {token,user} = useSelector((state)=>state.user)
    const {selectedUser} = useSelector((state)=>state.chat)
    const dispatch = useDispatch();
    const fetchMessages = async()=>{
        try{
            const response = await apiConnector("POST",GET_ALL_MESSAGES,{receiverId : selectedUser?._id},{
                Authorization : `Bearer ${token}`
            })
            console.log(response)
            if(response?.data?.success){
                dispatch(setMessages(response?.data?.messages))
            }
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchMessages();
    },[selectedUser,user])
}