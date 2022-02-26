const ConversationModel = require("../models/Conversation");

export const createNewConversation = async (participants) => {
  const receiver = participants.receiver;
  const sender = participants.sender;

  const conversations = await findConversationById(receiver.id);

  const conversation = conversations.filter((c) =>
    c.members.some((p) => p.id === sender.id)
  );

  if (conversation.length > 0) {
    return conversation[0];
  } else {
    try {
      const newConversation = await new ConversationModel({
        members: [receiver, sender],
      });
      await newConversation.save();
      return newConversation;
    } catch (error) {
      return error;
    }
  }
};

export const findConversationById = async (id) => {
  const conversation = await ConversationModel.find({
    members: { $elemMatch: { id } },
  });
  return conversation;
};
