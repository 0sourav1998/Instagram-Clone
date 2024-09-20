const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadFileToCloudinary } = require("../utils/uploadFileToCloudinary");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username,email,password)
    let response ;
    if(req?.files){
      console.log(req?.files?.file)
      const image = req?.files?.file;
      response = await uploadFileToCloudinary(image,process?.env?.FOLDER_NAME)
    }
    if (!username || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All Fields Are Required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Registered with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      photo : response.secure_url
    });
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    let user = await User.findOne({ username }).populate("posts");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Registered with this email",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        username : user.username
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      user = {
        id: user._id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        bio: user.bio,
        gender: user.gender,
        followers: user.followers,
        following: user.following,
        posts: user.posts,
      };

      return res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 1 * 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: "User Logged In Successfully",
          token,
          user,
        });
    }else{
      return res.status(400).json({
        success : false ,
        message : "Password is Incorrect"
      })
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { bio, gender } = req.body;
    const profilePhoto = req.files.file;
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (profilePhoto) {
      const cloudinaryResponse = await uploadFileToCloudinary(
        profilePhoto,
        process.env.FOLDER_NAME
      );
      user.photo = cloudinaryResponse.secure_url;
    }
    if (bio) {
      user.bio = bio;
    }
    if (gender) {
      user.gender = gender;
    }
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Profile Edited Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.suggestedUser = async (req, res) => {
  try {
    const suggestedUser = await User.find({ _id: { $ne: req.userId } }).select(
      "-password"
    );
    if (!suggestedUser) {
      return res.status({
        success: false,
        message: "Suggested User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      suggestedUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.followOrNot = async (req,res) => {
  try {
    const userId = req.userId; // who is following
    const {whomToFollow} = req.body;
    if (!userId || !whomToFollow) {
      return res.status(400).json({
        success: false,
        message: "Both Fields Are Required",
      });
    }
    const user = await User.findById(userId);
    const whomToFollowOrUnfollow = await User.findById(whomToFollow);
    if (!user || !whomToFollowOrUnfollow) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (!user?.following?.includes(whomToFollow)) {
      //not followed , will follow
      await User.findByIdAndUpdate(userId, {
        $push: { following: whomToFollow },
      });
      await User.findByIdAndUpdate(whomToFollow, {
        $push: { followers: userId },
      });
      return res.status(200).json({
        success: true,
        message: "Followed Successfully",
      });
    } else {
      //followed , not follow now
      await User.findByIdAndUpdate(userId, {
        $pull: { following: whomToFollow },
      });
      await User.findByIdAndUpdate(whomToFollow, {
        $pull: { followers: userId },
      });
      return res.status(200).json({
        success: true,
        message: "Un Followed Successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
