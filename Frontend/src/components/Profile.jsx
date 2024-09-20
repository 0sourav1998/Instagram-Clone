import { useSetUserProfile } from "@/hooks/userSetUserProfile";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { AtSign, Badge } from "lucide-react";

const Profile = () => {
  const {id} = useParams();
  const {user} = useSelector((state)=>state?.user)
  useSetUserProfile();

  useEffect(()=>{
    setActive("posts")
  },[])

  const alreadyFollowed = true;
  const isLoggedIn = user.id === id;
  const [active,setActive] = useState("")
  
  const handleChange = (text) =>{
    let result ;
    if(text === "posts"){
      result = userProfile?.posts;
      console.log(result)
      setActive("posts")
    }else{
      result = userProfile?.bookmarks;
      setActive("saved")
    }
  }
  const { userProfile } = useSelector((state) => state?.user);
  return (
    <div className="justify-center flex flex-1 flex-col mx-auto gap-6 ml-80">
      <div className="max-w-6xl justify-center flex mx-auto mt-6 gap-16">
        <div>
          <Avatar className="h-40 w-40">
            <AvatarImage src={userProfile?.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-3">
            <p className="text-lg font-semibold">{userProfile?.username}</p>
            {isLoggedIn ? (
              <div className="flex gap-1">
                <Button className="bg-gray-100 hover:bg-gray-200 rounded-xl">
                  Edit Profile
                </Button>
                <Button className="bg-gray-100 hover:bg-gray-200 rounded-xl">
                  View archive
                </Button>
              </div>
            ) : (
              <div>
                {alreadyFollowed ? (
                  <div className="flex gap-2">
                    <Button className="bg-[#0095F6] text-white rounded-xl px-8 py-1 font-bold hover:bg-[#3594d3]">
                      UnFollow
                    </Button>
                    <Button className="bg-[#0095F6] text-white rounded-xl px-8 py-1 font-bold hover:bg-[#3594d3]">
                      Message
                    </Button>
                  </div>
                ) : (
                  <Button className="bg-[#0095F6] text-white rounded-xl px-8 py-1 font-bold hover:bg-[#3594d3]">
                    Follow
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-14">
            <p>
              <span className="font-semibold">{userProfile?.posts.length}</span>{" "}
              posts
            </p>
            <p>
              <span className="font-semibold">
                {userProfile?.following.length}
              </span>{" "}
              following
            </p>
            <p>
              <span className="font-semibold">
                {userProfile?.followers.length}
              </span>{" "}
              followers
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <p className="text-gray-600 text-xs">
              {userProfile?.bio || "Bio here..."}
            </p>
            <div className="flex items-center gap-2 w-fit bg-gray-100 text-xs p-2 rounded-xl font-bold">
              <AtSign />
              {userProfile?.username}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Learn Code With sourav</p>
              <p className="text-sm font-semibold">Learn Code With Fun</p>
              <p className="text-sm font-semibold">Ready to be hired</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] flex justify-center border-t border-t-gray-500">
        <div className="flex gap-4 right-10">
          <span className={`cursor-pointer ${active === "posts" ? "font-bold border-b-4" : "text-gray-600"} p-2`} onClick={()=>handleChange("posts")}>POST</span>
          <span className={`cursor-pointer ${active === "saved" ? "font-bold border-b-4" : "text-gray-600"} p-2`} onClick={()=>handleChange("saved")}>SAVED</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
