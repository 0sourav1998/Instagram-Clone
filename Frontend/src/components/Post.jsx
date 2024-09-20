import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  commentOnPosts,
  deletePost,
  likeOrDislikePost,
} from "@/service/operations/Post";
import { setAllPosts, setSelectedPost } from "@/redux/slice/postSlice";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state?.user);
  const { allPost } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [selectPost, setSelectPost] = useState(null);

  const handlePostComments = async () => {
    try {
      const result = await commentOnPosts(
        { postId: post._id, comment: text },
        token
      );
      dispatch(setAllPosts([...allPost, result?.data?.createdComment]));
      if (result) {
        toast.success(result?.data?.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeOrDislike = async () => {
    try {
      const result = await likeOrDislikePost({ postId: post._id }, token);
      if (result) {
        toast.success(result?.data?.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.success("Failed to do Operation");
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deletePost({ postId: post?._id }, token);
      if (response) {
        dispatch(setAllPosts(response?.data?.Posts));
        toast.success("Post Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete the post");
    } finally {
      setLoading(false);
    }
  };
  const handleTextChange = (e) => {
    if (e.target.value.trim()) {
      setText(e.target.value);
    } else {
      setText("");
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to={`/profile/${post.author._id}`}>
            <Avatar>
              <AvatarImage src={post?.author?.photo} alt="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <Link to={`/profile/${post.author._id}`}>
            <h1 className="font-semibold text-lg">{post?.author?.username}</h1>
          </Link>
        </div>
        <div>
          <Dialog>
            <DialogTrigger className="cursor-pointer">
              <MoreHorizontal />
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-4 bg-white items-center justify-center">
              <Button
                variant="ghost"
                className="w-fit rounded-md bg-[#ED4956] cursor-pointer"
              >
                Unfollow
              </Button>
              <Button className="w-fit rounded-md cursor-pointer">
                Add to Fav
              </Button>
              {user && user.id === post?.author?._id && (
                <Button
                  onClick={handleDelete}
                  className="w-fit rounded-sm cursor-pointer"
                >
                  {loading ? (
                    <Button>Loading...</Button>
                  ) : (
                    <Button>Delete</Button>
                  )}
                </Button>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="my-2 rounded-sm aspect-square w-full object-cover">
        <img src={post?.image} className="h-96 w-96" />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div>
            {post?.likes?.includes(user.id) ? (
              <FaHeart
                onClick={handleLikeOrDislike}
                size={"24px"}
                className="cursor-pointer text-red-600 hover:scale-105"
              />
            ) : (
              <FaRegHeart
                onClick={handleLikeOrDislike}
                size={"24px"}
                className="cursor-pointer hover:scale-105"
              />
            )}
          </div>
          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <div>
          <Bookmark className="cursor-pointer hover:text-gray-600" />
        </div>
      </div>
      <span className="font-medium block mb-2">
        {post?.likes?.length} Likes
      </span>
      <p>
        <span className="font-medium mr-2">{post?.author?.username}</span>
        {post?.caption}
      </p>
      {post?.comments?.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          View all {post?.comments?.length} Comments
        </span>
      )}
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex justify-between mt-2">
        <input
          type="text"
          onChange={handleTextChange}
          placeholder="Add a Comment"
          className="outline-none"
          value={text}
        />
        {text && (
          <Button
            onClick={handlePostComments}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </Button>
        )}
      </div>
    </div>
  );
};

export default Post;
