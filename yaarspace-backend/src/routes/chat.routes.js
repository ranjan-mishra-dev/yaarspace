import express from "express";
import {
  getMyConversations,
  getMessages,
  sendMessage,
  markMessagesAsRead,
  editMessage,
  deleteMessageForEveryone,
} from "../controllers/chat.controller.js";

import  authMiddleware  from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/conversations", authMiddleware, getMyConversations);
router.get("/messages/:conversationId", authMiddleware, getMessages);

router.post("/messages/:conversationId", authMiddleware, sendMessage);

router.patch("/messages/:conversationId/read", authMiddleware, markMessagesAsRead);
router.patch("/messages/:messageId/edit", authMiddleware, editMessage);
router.delete("/messages/:messageId/everyone", authMiddleware, deleteMessageForEveryone);

export default router;