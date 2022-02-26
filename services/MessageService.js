const MessageModel = require("../models/Message");

export const saveMessage = (message) => {
  const savedMessage = new MessageModel(message).save();
  return savedMessage;
};

export const findConversation = async (conversationID) => {
  const conversation = await MessageModel.find({
    conversationID,
  });
  return conversation;
};
