import express from "express";
import supabase from '../db/supabaseClient.js'
import { searchPeople } from "../controllers/search.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, searchPeople);
export default router;