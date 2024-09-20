import { useSetUserProfile } from "@/hooks/userSetUserProfile";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { AtSign, Heart, MessageCircle } from "lucide-react";

const Profile = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state?.user);

  useSetUserProfile();

  useEffect(() => {
    setActive("posts");
  }, []);

  const alreadyFollowed = true;
  const isLoggedIn = user.id === id;
  const [active, setActive] = useState("");

  const handleChange = (text) => {
    let result;
    if (text === "posts") {
      result = userProfile?.posts;
      console.log(result);
      setActive("posts");
    } else {
      result = userProfile?.bookmarks;
      setActive("saved");
    }
  };

  const { userProfile } = useSelector((state) => state?.user);

  return (
    <div className="flex flex-col mx-auto mt-8 gap-6 ml-60 mb-10 max-w-7xl">
      {/* Profile Header Section */}
      <div className="flex items-center justify-center mx-auto mt-6 gap-16">
        <Avatar className="h-40 w-40">
          <AvatarImage src={userProfile?.photo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <p className="text-lg font-semibold">{userProfile?.username}</p>
            {isLoggedIn ? (
              <div className="flex gap-2">
                <Link to={`/profile/edit/${userProfile._id}`}>
                  <Button className="bg-gray-100 hover:bg-gray-200 rounded-xl">
                    Edit Profile
                  </Button>
                </Link>
                <Button className="bg-gray-100 hover:bg-gray-200 rounded-xl">
                  View Archive
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
          {/* Follow Stats */}
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
          {/* Bio Section */}
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm">
              {userProfile?.bio || "Bio here..."}
            </p>
            <div className="flex items-center gap-2 bg-gray-100 text-xs p-2 rounded-xl font-bold">
              <AtSign />
              {userProfile?.username}
            </div>
            <div className="text-sm font-semibold">
              {userProfile?.bioDescription || "Ready to be hired!"}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-[90%] flex flex-col mx-auto border-t border-gray-300">
        <div className="flex justify-center gap-6 mt-4">
          <span
            className={`cursor-pointer p-2 ${
              active === "posts"
                ? "font-bold border-b-4 border-gray-900"
                : "text-gray-600"
            }`}
            onClick={() => handleChange("posts")}
          >
            POSTS
          </span>
          <span
            className={`cursor-pointer p-2 ${
              active === "saved"
                ? "font-bold border-b-4 border-gray-900"
                : "text-gray-600"
            }`}
            onClick={() => handleChange("saved")}
          >
            SAVED
          </span>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {userProfile?.posts?.map((post) => (
            <div
              key={post._id}
              className="relative cursor-pointer group overflow-hidden rounded-lg"
            >
              <img
                src={post?.image}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                alt="Post"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="flex gap-4 text-white">
                  <button className="flex items-center gap-1 hover:text-gray-300">
                    <Heart />
                    <span>{post?.likes.length}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-300">
                    <MessageCircle />
                    <span>{post?.comments.length}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
