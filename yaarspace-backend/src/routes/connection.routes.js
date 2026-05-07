import express from "express";
import {
  sendConnectionRequest,
  getReceivedRequests,
  getSentRequests,
  acceptConnectionRequest,
  rejectConnectionRequest,
  removeSentRequest,
} from "../controllers/connection.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send/:receiverId", authMiddleware, sendConnectionRequest);

router.get("/received", authMiddleware, getReceivedRequests);

router.get("/sent", authMiddleware, getSentRequests);

router.patch("/accept/:connectionId", authMiddleware, acceptConnectionRequest);

router.patch("/reject/:connectionId", authMiddleware, rejectConnectionRequest);

router.delete("/remove/:connectionId", authMiddleware, removeSentRequest);

export default router;