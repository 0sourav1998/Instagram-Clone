const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer " , "");
        if(!token){
            return res.status(400).json({
                success : false ,
                message : "User Not Authenticated"
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(400).json({
                success : false ,
                message : "Invalid Token"
            })
        }
        req.userId = decode.id ;
        next();
    } catch (error) {
        console.log(error.message)
    }
}