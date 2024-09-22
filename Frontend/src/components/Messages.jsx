import { Avatar } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Messages = () => {
  const {messages} = useSelector((state)=>state.chat);
  const { selectedUser } = useSelector((state) => state.chat);
  const {user} = useSelector((state)=>state.user);
  return (
    <div className="">
      <div className="flex flex-col gap-2 items-center mt-5">
        <Avatar>
          <AvatarImage
            className="h-20 w-20 rounded-full"
            src={selectedUser?.photo}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold ">{selectedUser?.username}</span>
        <Link to={`/profile/${selectedUser?._id}`}>
          <Button className="w-fit bg-[#0095F6] text-white hover:bg-[#3d9cdb] p-3 rounded-xl">
            View Profile
          </Button>
        </Link>
      </div>
      <div className="max-h-[30vh] mt-4">
        {
          messages && messages?.map((msg)=>(
            
            <div key={msg._id} className={`flex gap-1 max-w-full ${msg?.senderId === user.id ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 m-2 mb-2 w-fit break-words rounded-xl ${msg?.senderId === user.id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                {msg.message}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Messages;
