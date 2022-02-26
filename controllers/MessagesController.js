import { saveMessage, findConversation } from "../services/MessageService";

export const GetAllMessages = async (req, res) => {
  try {
    const messages = await findConversation(req.params.conversationId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const SendMessage = async (req, res) => {
  try {
    const savedMessage = await saveMessage(req.body);
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};
