import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/slice/chatSlice";
import { MessageCircleCode } from "lucide-react";
import { Button } from "./ui/button";
import Messages from "./Messages";

const ChatPage = () => {
  const { user, suggestedUsers } = useSelector((state) => state.user);
  const {onlineUser} = useSelector((state)=>state.chat)
  const { selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  return (
    <div className="w-screen ml-60 mx-auto mt-8">
      <div className="flex gap-2 items-center font-bold font-lg">
        <Avatar>
          <AvatarImage>{user?.photo}</AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1>{user?.username}</h1>
      </div>
      <hr />
      <div className="flex">
        <div className="mt-4 w-[16%] border-r h-[80vh] overflow-y-auto">
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
        <div className="w-[80%]">
          {selectedUser ? (
            <div className="max-h-screen">
              <div className="flex items-center border-b p-4 gap-x-4">
                <Avatar>
                  <AvatarImage src={selectedUser?.photo} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-semibold">{selectedUser?.username}</h1>
              </div>
              <div className="min-h-[60vh] w-[80%] overflow-y-auto p-2">
                <Messages/>
              </div>
              <div className="mt-4 ml-2 flex gap-4 items-center">
                <input type="text" placeholder="Enter Message here..." className="w-[70%] focus:outline-none p-3 focus-within:ring-transparent"/>
                <Button className="bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition-all duration-200">Send</Button>
              </div>
            </div>
          ) : (
            <div className="w-[80%] h-[80vh] flex flex-col gap-2 items-center justify-center ">
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
