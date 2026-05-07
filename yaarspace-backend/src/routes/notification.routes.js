// routes/notification.routes.js
import express from "express";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMyNotifications);
router.patch("/:notificationId/read", authMiddleware, markNotificationAsRead);

export default router;