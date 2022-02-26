import {
  createNewConversation,
  findConversationById,
} from "../services/ConversationService";

export const CreateNewConversation = async (req, res) => {
  try {
    const conversation = await createNewConversation(req.body);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(err);
  }
};

export const GetConversation = async (req, res) => {
  try {
    const conversation = await findConversationById(req.params.userid);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(err);
  }
};
