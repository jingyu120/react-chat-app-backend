import express from "express";
const router = express.Router();
import {
  GetAllMessages,
  SendMessage,
} from "../controllers/MessagesController.js";

router.get("/:conversationId", GetAllMessages);
router.post("/", SendMessage);
module.exports = router;
