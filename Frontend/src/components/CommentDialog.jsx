import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { commentOnPosts } from "@/service/operations/Post";
import { setAllPosts, setSelectedPost } from "@/redux/slice/postSlice";
import { toast } from "sonner";

const CommentDialog = ({ open, setOpen }) => {
  const [text,setText] = useState("");
  const {user , token} = useSelector((state)=>state?.user)
  const dispatch = useDispatch();
  const {selectedPost,allPost} = useSelector((state)=>state?.post)
  const handleTextChange = (e)=>{
    const value = e.target.value ;
    if(value?.trim()){
      setText(value)
    }else{
      setText("")
    }
  }
  const handlePostComments = async () => {
    try {
      const result = await commentOnPosts(
        { postId: selectedPost._id, comment: text },
        token
      );
      if (result) {
        dispatch(setSelectedPost(result?.data?.updatedPost))
        toast.success(result?.data?.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="flex bg-white max-w-5xl justify-between"
        >
          <div className="w-1/2">
            <img src={selectedPost?.image} />
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex justify-between p-0">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={user?.photo} className="rounded-full h-10 w-10"/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="mt-2">{user?.username}</span>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <button className="rounded-md text-[#ED4956] font-bold w-full">
                      Unfollow
                    </button>
                    <button className="cursor-pointer">Add to Fav</button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <hr/>
            <div className="flex-1">
              {
                selectedPost?.comments?.map((comment)=>(
                  <Comment key={comment._id} comment={comment} />
                ))
              }
            </div>
            <div className="flex gap-2">
              <input value={text} onChange={handleTextChange} className="outline-none p-2 w-full focus:ring-2 focus:blue-500 rounded-md"/>
              <Button onClick={handlePostComments} disabled={!text} variant="outline">Send</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentDialog;
