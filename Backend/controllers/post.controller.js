const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const { io, getSocketId } = require("../socket/socket");
const { uploadFileToCloudinary } = require("../utils/uploadFileToCloudinary");
require("dotenv").config()

exports.addNewPost = async(req,res)=>{
    try {
        const {caption} = req.body ;
        const userId = req.userId ;
        const profilePhoto = req.files.file ;
        const user = await User.findById(userId);
        let response ;
        if(profilePhoto){
            response = await uploadFileToCloudinary(profilePhoto,process.env.FOLDER_NAME)
        }
        const createdPost = await Post.create({
            caption,
            image : response.secure_url ,
            author : userId
        })
        await User.findByIdAndUpdate(userId,{$push : {posts : createdPost._id}});
        return res.status(200).json({
            success : true ,
            message : "Post Created Successfully",
            createdPost ,
            user
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Post Creation"
        })
    }
}


exports.getAllPost = async(req,res)=>{
    try {
        const posts = await Post.find({}).populate({ path : "author" , select : "username photo"}).populate({path : "comments" , populate : { path : "author" , select : "username photo"}});
        return res.status(200).json({
            success : true ,
            message : "Posts Fetched Successfully",
            posts
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Fetching Posts"
        })
    }
}

exports.getSpecificUserPost = async(req,res)=>{
    try {
        const userId = req.userId ;
        const posts = await Post.find({ author : userId}).populate({ path : "author" , select : "username photo" }).populate({ path : "comments" , populate : { path : "author" , select : "username,photo"}})
        return res.status(200).json({
            success : true ,
            message : "Posts Fetched Successfully",
            posts
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Fetching Posts"
        })
    }
}

exports.likedPost = async(req,res)=>{
    try {
        const userId = req.userId ;
        const {postId} = req.body ;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                success : false ,
                message : "Post Not Found"
            })
        }
        if(post.likes.includes(userId)){
            await Post.findByIdAndUpdate(postId , { $pull : { likes : userId}})
            const user = await User.findById(userId).select("photo username");
            if(user._id !== post?.author.toString()){
                const notification = {
                    type : "Disliked",
                    userDetails : user , 
                    postId ,
                    userId ,
                    message : "You Post Was Dis-Liked"
                } 
                const postOwnerSocketId = getSocketId(post?.author.toString());
                if(postOwnerSocketId){
                    io.to(postOwnerSocketId).emit("notification",notification)
                }
            }
            return res.status(200).json({
                success : true ,
                message : "Like Removed"
            })
        }else{
            await Post.findByIdAndUpdate(postId , { $push : { likes : userId}}) ;
            //socket io implementation
            const user = await User.findById(userId).select("photo username");
            if(user._id !== post?.author.toString()){
                const notification = {
                    type : "Liked",
                    userDetails : user , 
                    postId ,
                    userId ,
                    message : "You Post Was Liked"
                } 
                const postOwnerSocketId = getSocketId(post?.author.toString());
                if(postOwnerSocketId){
                    io.to(postOwnerSocketId).emit("notification",notification)
                }
            }
            return res.status(200).json({
                success : true ,
                message : "Liked"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message  : "Something Went Wrong While like or unlike the Post"
        })
    }
}

exports.addComment =  async(req,res)=>{
    console.log("inside add comment")
    try {
        const {comment,postId} = req.body ;
        const userId = req.userId ;
        if(!comment || !postId){
            return res.status(400).json({
                success : false ,
                message : "All Fields Are Required"
            })
        }
        const createdComment = await Comment.create({
            text : comment ,
            author : userId ,
            post : postId
        })
        createdComment.populate({
            path : "author" ,
            select : "username photo"
        });
        const updatedPost = await Post.findByIdAndUpdate(postId,{$push : {comments : createdComment._id}},{new : true}).populate({
            path : "comments" ,
            populate : { path : "author"}
        });
        console.log(updatedPost?.comments)
        return res.status(201).json({
            success : true ,
            message : "Comment Given" ,
            createdComment ,
            updatedPost
        })
    } catch (error) {
        return res.status(201).json({
            success : false ,
            message : "Something Went Wrong While Giving The Comment" 
        })
    }
} 

exports.getCommentsForSpecificPost = async(req,res)=>{
    try {
        const {postId} = req.body;
        const commentsOfSpecificPost = await Comment.find({post : postId}).populate("author");
        if(!commentsOfSpecificPost){
            return res.status(404).json({
                success : false ,
                message : "No Comments Found for this post"
            })
        }
        return res.status(200).json({
            success : true ,
            message : "Comments Fetched For a Particular Post",
            commentsOfSpecificPost
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Fetching Comments "
        })
    }
}

exports.deletePost = async(req,res)=>{
    try {
        const {postId} = req.body ;
         const userId = req.userId ;
         if(!postId){
            return res.status(400).json({
                success: false ,
                message : "Post Not Found"
            })
         }
         const post = await Post.findById(postId);
         if(post.author.toString() !== userId){
            return res.status(400).json({
                success : false ,
                message : "You are not the owner of the Post"
            })
         }
         await Post.findByIdAndDelete(postId);
         const user = await User.findById(userId);
         user.posts = user.posts.filter((id)=>id.toString() !== postId);
         await Comment.deleteMany({post : postId})
         await user.save();
         const Posts = await Post.find({});
         return res.status(200).json({
            success : true ,
            message : "Post Deleted",
            Posts
         })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Deleting the Post",
         })
    }
}

exports.addToBookmark = async(req,res)=>{
    try {
        const userId = req.userId ;
        const {postId} = req.body ;
        if(!postId){
            return res.status(400).json({
                success : false ,
                message : "This Field is required"
            })
        }
        const user = await User.findById(userId) ;
        if(user.bookmarks.includes(postId)){
            // return res.status(400).json({
            //     success : false ,
            //     message : "Post Already Bookmarked"
            // })
            user.bookmarks = user.bookmarks.filter((id)=>id.toString() !== postId);
            await user.save();
            return res.status(200).json({
                success : true ,
                message : "Bookmark Removed"
            })
        }
        // const user = await User.findByIdAndUpdate(userId,{ $push : { bookmarks : postId}},{new : true});
        user.bookmarks.push(postId);
        await user.save();
        return res.status(200).json({
            success : true ,
            message : "Bookmark Added",
            user
        })
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Something Went Wrong While Adding Bookmark"
        })
    }
}