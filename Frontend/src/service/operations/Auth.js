import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { setToken } from "@/redux/slice/userSlice";

const {SIGNUP,LOGIN,EDIT_PROFILE} = authEndpoints ;

export const SignupOperation = async(body,navigate)=>{
        try {
            const response = await apiConnector("POST",SIGNUP,body);
            navigate("/login")
            toast.success("Account Created Successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
}


export const LoginOperation = async(body)=>{
        try {
            const response = await apiConnector("POST",LOGIN,body);
            return response ;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
}

export const editProfile = async(body,token)=>{
    try {
        const response = await apiConnector("PUT",EDIT_PROFILE,body,{
            Authorization : `Bearer ${token}`
        }) ;
        if(response?.data?.success){
            return response ;
        }
    } catch (error) {
        console.log(error.message)
    }
}