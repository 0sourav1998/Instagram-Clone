const express  = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { login, register, editProfile, followOrNot, getProfile, suggestedUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/login", login)
router.post("/register",register)
router.put("/editProfile",isAuthenticated,editProfile)
router.post("/followUnfollow",isAuthenticated,followOrNot)
router.post("/getProfile",isAuthenticated,getProfile)
router.post("/suggestedUser",isAuthenticated,suggestedUser) 


module.exports = router ;