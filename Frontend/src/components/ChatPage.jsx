import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setMessages, setSelectedUser } from "@/redux/slice/chatSlice";
import { MessageCircleCode } from "lucide-react";
import { Button } from "./ui/button";
import Messages from "./Messages";
import axios from "axios";
import { useGetAllMessages } from "@/hooks/useGetAllMessages";
import { useGetRTM } from "@/hooks/useGetRTM";

const ChatPage = () => {
  useEffect(()=>{
    dispatch(setSelectedUser(null))
  },[])
  useGetRTM();
  useGetAllMessages();
  const { user, suggestedUsers , token } = useSelector((state) => state.user);
  const [text,setText] = useState("")
  const {onlineUser,messages} = useSelector((state)=>state.chat)
  const { selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const handleClick = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/message/sendMessages",{message : text , receiverId : selectedUser._id},{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      if(response?.data?.success){
        dispatch(setMessages([...messages,response?.data?.newMessage]))
        setText("")
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="w-[83%] ml-56 mx-auto mt-8">
      <div className="flex gap-2 items-center font-bold font-lg">
        <Avatar>
          <AvatarImage>{user?.photo}</AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1>{user?.username}</h1>
      </div>
      <hr />
      <div className="flex">
        <div className="mt-4 w-[25%] border-r h-[80vh] overflow-y-auto">
          {suggestedUsers?.map((user) => {
            const isOnline = onlineUser?.includes(user._id)
            return(
              <div
              onClick={() => dispatch(setSelectedUser(user))}
              key={user.id}
              className="flex items-center gap-2  cursor-pointer hover:bg-gray-200 p-3"
            >
              <div>
                <Avatar>
                  <AvatarImage src={user?.photo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <dv className="flex flex-col gap-2">
                <span>{user.username}</span>
                <span
                  className={`text-xs font-bold ${
                    isOnline ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </dv>
            </div>
            )
          }
          )}
        </div>
        <div className="w-[75%]">
          {selectedUser ? (
            <div className="max-h-screen">
              <div className="flex items-center border-b p-4 gap-x-4">
                <Avatar>
                  <AvatarImage src={selectedUser?.photo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-semibold">{selectedUser?.username}</h1>
              </div>
              <div className="min-h-[60vh] w-full overflow-y-auto p-2">
                <Messages/>
              </div>
              <div className="fixed w-[60vw] mt-4 ml-2 flex gap-4 items-center">
                <div className="relative w-full">
                  <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter Message here..." className="w-full rounded-xl focus:outline-none focus-within:ring-1 ring-blue-500 p-4"/>
                 {
                  text.trim() &&  <span onClick={handleClick} className="absolute top-4 right-5 text-blue-700 transition-all duration-200 justify-end cursor-pointer">Send</span>
                 }
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[75%%] h-[80vh] flex flex-col gap-2 items-center justify-center ">
                <MessageCircleCode className="h-32 w-32"/>
                <h1>Click on the Chat to start Conversation</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
