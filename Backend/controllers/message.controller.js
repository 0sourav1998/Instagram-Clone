const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getSocketId, io } = require("../socket/socket");

exports.sendMessage = async (req, res) => {
  try {
    console.log("inside this")
    const senderId = req.userId;
    const { receiverId, message } = req?.body;
    console.log(receiverId,message)
    if (!receiverId || !message) {
      return res.status(404).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    console.log(conversation);
    console.log(newMessage)

    conversation.messages.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    //socket io
    const receiverSocketId = getSocketId(receiverId);
    if(receiverId){
      io.to(receiverSocketId).emit("newMsg",newMessage)
    }

    return res.status(200).json({
        success : true ,
        message : "Message Sent Successfully",
        newMessage
    })
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error in Sending Message , Please Try again",
    });
  }
};

exports.getMessage = async(req,res)=>{
    try {
        const senderId = req.userId ;
        const {receiverId} = req.body;
        console.log(senderId,receiverId)

        const conversation = await Conversation.findOne({
            participants : { $all : [senderId,receiverId]}
        }).populate("messages") ;

        if(!conversation){
            return res.status(200).json({
                success : true ,
                messages : [] 
            })
        }
        console.log("COnversation",conversation)
        return res.status(200).json({
            success : true ,
            message : "Messages Fetched Successfully" ,
            messages : conversation?.messages
        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: "Error in Fetching Message , Please Try again",
          });
    }
}
