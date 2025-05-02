const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../Socket/Socket");

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    const participants = [senderId, receiverId].sort((a, b) =>
      a.toString().localeCompare(b.toString())
    );
    let gotConversations = await Conversation.findOne({
      participants,
    });
    if (!gotConversations) {
      gotConversations = await Conversation.create({
        participants,
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      gotConversations.message.push(newMessage._id);
    }
    await Promise.all([gotConversations.save(), newMessage.save()]);
    //SOCKET.IO
    // const receiverSocketId= getReceiverSocketId(receiverId)
    // if(receiverSocketId){
    //     io.to(receiverSocketId).emit('newMessage',newMessage)
    // }
    const senderSocketId = getReceiverSocketId(senderId);
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage); // sender needs to get it too
    }
    return res.json({
      newMessage,
      success: true,
      message: "Send Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const participants = [senderId, receiverId].sort((a, b) =>
      a.toString().localeCompare(b.toString())
    );
    const conversation = await Conversation.findOne({
      participants,
    }).populate("message");
    return res.json(conversation?.message);
  } catch (error) {
    console.log(error);
  }
};
