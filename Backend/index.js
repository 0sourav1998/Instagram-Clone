const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {connectToDb} = require("../Backend/config/db");
const { cloudinaryConfig } = require("./config/cloudinary");
const userRouter = require("../Backend/routes/user.route")
const postRoute = require("../Backend/routes/post.route");
const messageRoute = require("../Backend/routes/message.route")
const fileUpload = require("express-fileupload")

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const corsOption = {
    origin : "http://localhost:5173",
    credentials : true ,
}
app.use(cors(corsOption))
app.use(cookieParser())

connectToDb();
cloudinaryConfig().then(()=>console.log("Cloudinary Connected Successfully"))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRoute)
app.use("/api/v1/message",messageRoute)

const PORT = process.env.PORT || 4000 ;

app.listen(PORT,()=>{
    console.log(`App is Listening to PORT : ${PORT}`)
})