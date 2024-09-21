import { Avatar } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Messages = () => {
  const { selectedUser } = useSelector((state) => state.chat);
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
    </div>
  );
};

export default Messages;
