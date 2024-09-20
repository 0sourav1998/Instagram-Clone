import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { editProfile } from "@/service/operations/Auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setUser, setUserProfile } from "@/redux/slice/userSlice";
import { Loader2 } from "lucide-react";

const EditProfile = () => {
  const { userProfile, token , user } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    bio: "",
    gender: "",
    image: null,
  });
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(userProfile){
        setInput({
            bio : userProfile.bio || "" ,
            gender : userProfile.gender || "" 
        })
    }
  },[])

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("userId", userProfile._id);
      if (input?.bio) {
        formData.append("bio", input?.bio);
      }
      if (input?.gender) {
        formData?.append("gender", input?.gender);
      }
      if (input?.image) {
        formData.append("file", input?.image);
      }
      const result = await editProfile(formData, token);
      const updatedDetails = {
        ...userProfile,
        bio: result?.data?.user.bio,
        gender: result?.data?.user.gender,
        photo: result?.data?.user.photo,
      };
      dispatch(setUserProfile(updatedDetails));
      dispatch(
        setUser({
          ...user,
          bio: result?.data?.user.bio,
          gender: result?.data?.user.gender,
          photo: result?.data?.user.photo,
        })
      );
      navigate(`/profile/${userProfile._id}`);
      toast.success(result?.data?.message);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHandle = (e) => {
    console.log(e.target.value);
    setInput({ ...input, gender: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    setInput({ ...input, image: file });
  };
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="font-bold text-xl mb-6">Edit Profile</h1>
      <div className="flex flex-col gap-y-6">
        <div className="w-full flex justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div>
              <Avatar>
                <AvatarImage src={userProfile?.photo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-lg">
                {userProfile?.username}
              </span>
              <span className="text-sm text-gray-600">
                {userProfile?.bio || "Bio here"}
              </span>
            </div>
          </div>
          <div className="mt-2">
            <input
              ref={imageRef}
              onChange={handleFileChange}
              type="file"
              className="hidden"
            />
            <Button
              onClick={() => imageRef?.current?.click()}
              className="w-fit text-white bg-[#0095F6] hover:bg-[#3ea7ec] rounded-[10px]"
            >
              Change Profile Picture
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <h1 className="font-bold text-xl">Bio</h1>
          <textarea
            value={input?.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            type="text"
            placeholder="Enter Your Bio here..."
            rows={4}
            className="border p-2 focus-within:bg-blue-100"
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <h1 className="font-bold text-xl">Gender</h1>
          <select
            value={input.gender}
            className="border border-blue-500 p-2"
            onChange={handleSelectHandle}
          >
            <option value="">--Select Your Gender--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button
              onClick={handleSubmit}
              className="bg-[#0095F6] text-white hover:bg-[#3d9cdb] p-3"
            >
              <Loader2 className="animate-spin mr-2" /> Loading
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-[#0095F6] text-white hover:bg-[#3d9cdb] p-3"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
