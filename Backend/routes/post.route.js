const express  = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { addNewPost, getAllPost, likedPost, addComment, getCommentsForSpecificPost, deletePost, addToBookmark } = require("../controllers/post.controller");
const router = express.Router();

router.post("/addPost",isAuthenticated, addNewPost)
router.get("/getAllPosts",isAuthenticated, getAllPost)
router.post("/likeOrDislikePost",isAuthenticated, likedPost)
router.post("/addComment",isAuthenticated, addComment)
router.post("/getCommentsForSpecificPost",isAuthenticated, getCommentsForSpecificPost)
router.delete("/deletePost",isAuthenticated, deletePost)
router.post("/addToBookmark",isAuthenticated, addToBookmark)



module.exports = router ;