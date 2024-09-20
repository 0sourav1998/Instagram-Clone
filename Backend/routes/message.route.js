const express  = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { getMessage, sendMessage } = require("../controllers/message.controller");
const router = express.Router();

router.post("/getMessages",isAuthenticated,getMessage)
router.post("/sendMessages",isAuthenticated,sendMessage)


module.exports = router ;