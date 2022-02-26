const express = require("express");
const router = express.Router();
import {
  CreateNewConversation,
  GetConversation,
} from "../controllers/ConversationController.js";

router.post("/", CreateNewConversation);

router.get("/:userid", GetConversation);
module.exports = router;
