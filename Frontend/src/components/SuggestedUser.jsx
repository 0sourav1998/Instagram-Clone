import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user }) => {
  return (
    <div className="flex items-center gap-3 p-4 mr-4 bg-white shadow-md rounded-lg">
      <Link to={`/profile/${user._id}`}>
        <Avatar>
          <AvatarImage src={user?.photo} alt="User Photo" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex-1">
        <Link to={`/profile/${user._id}`}><h1 className="text-lg font-semibold">{user?.username}</h1></Link>
        <p className="text-sm text-gray-500">{user?.bio || "Bio here"}</p>
      </div>
      <p className="text-sm cursor-pointer text-[#3BADF8] hover:text-[#0f9af7] font-medium">
        Follow
      </p>
    </div>
  );
};

export default SuggestedUser;
