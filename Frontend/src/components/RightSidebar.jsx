import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SuggestedUser from "./SuggestedUser";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const { user } = useSelector((state) => state?.user);
  const { suggestedUsers } = useSelector((state) => state?.user);
  return (
    <div>
      <div className="flex gap-2 items-center mr-48 my-5 mt-10">
        <div>
          <Link to={`/profile/${user.id}`}>
            <Avatar>
              <AvatarImage src={user?.photo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <Link to={`/profile/${user.id}`}><h1 className="font-semibold text-lg">{user?.username}</h1></Link>
          <span className="text-gray-600 text-xs">
            {user?.bio || "Bio here..."}
          </span>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mr-6">
          <h1 className="font-semibold mb-2">Suggested Users</h1>
          <p className="text-xs ">See All</p>
        </div>
        <div>
          {suggestedUsers &&
            suggestedUsers?.map((user) => (
              <SuggestedUser key={user?._id} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
