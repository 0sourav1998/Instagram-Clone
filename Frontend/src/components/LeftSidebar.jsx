import { setToken } from "@/redux/slice/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LuInstagram } from "react-icons/lu";
import CreatePost from "./CreatePost";

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  console.log(open);
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setToken(null));
    navigate("/login");
    toast.success("Logged Out Successfully");
  };
  const handleClick = (text) => {
    if (text === "Logout") {
      handleLogout();
    }
    if (text === "Home") {
      navigate("/");
    }
    if (text === "Create") {
      setOpen(true);
    }
    if(text === "Profile"){
      navigate(`/profile/${user.id}`)
    }
    if(text === "Messages"){
      navigate("/chat")
    }
  };
  const leftSidebar = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar>
          <AvatarImage
            className="h-8 w-8 rounded-full"
            src={
              user?.photo
            }
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];
  return (
    <div>
      <div className="fixed h-screen w-[16%] border-r border-gray-300 pt-6">
        <div className="mb-2">
          <div className="flex justify-center"><LuInstagram  className="h-6 w-6"/></div>
          <p className="italic text-center font-bold">Instagram</p>
        </div>
        {leftSidebar?.map((item, index) => (
          <div
            onClick={() => handleClick(item?.text)}
            key={index}
            className="flex gap-x-6 hover:bg-gray-300 p-3 ml-2 py-4 transition-all duration-200 cursor-pointer"
          >
            {item?.icon}
            <span>{item?.text}</span>
          </div>
        ))}
      </div>
      {open && <CreatePost open={open} setOpen={setOpen} />}
    </div>
  );
};

export default LeftSidebar;
