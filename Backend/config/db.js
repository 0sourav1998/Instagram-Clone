const mongoose = require("mongoose");
require("dotenv").config()

exports.connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected Successfully")
    } catch (error) {
        console.log(error.message)
    }
}