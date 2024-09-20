const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const { receiverId, message } = req?.body;
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

    conversation.message.push(newMessage._id);

    await Promise.all([conversation.save(), newMessage.save()]);

    //socket io

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

        const conversation = await Conversation.findOne({
            participants : [senderId,receiverId]
        }).populate("messages") ;

        if(!conversation){
            return res.status(200).json({
                success : true ,
                messages : [] 
            })
        }
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
