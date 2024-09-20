import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const {allPost} = useSelector((state)=>state.post)
  return (
    <div>
      {allPost?.map((post, index) => (
        <div key={index} className="my-8">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
