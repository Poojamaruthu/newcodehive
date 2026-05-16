// routes/userRoutes.js

import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile
 
} from "../controller/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// REGISTER
router.post("/register", registerUser);


// LOGIN
router.post("/login", loginUser);


// GET PROFILE
router.get("/profile", protect, getUserProfile);


// SAVE SNIPPET


export default router;