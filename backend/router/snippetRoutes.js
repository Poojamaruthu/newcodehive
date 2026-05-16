// routes/snippetRoutes.js

import express from "express";

import {
  createSnippet,
  getPublicSnippets,
  saveSnippet,
  getMySnippets,
  getSavedSnippets,
  updateSnippet,
  deleteSnippet,
  removeSavedSnippet
} from "../controller/snippetController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE SNIPPET
router.post("/create", protect, createSnippet);

router.post("/save/:snippetId", protect, saveSnippet);
router.get("/public", getPublicSnippets);
router.get("/my", protect, getMySnippets);
router.get("/saved", protect, getSavedSnippets);
router.put("/:id", protect, updateSnippet);
router.delete("/:id", protect, deleteSnippet);
router.delete(
  "/unsave/:snippetId",
  protect,
  removeSavedSnippet
);
export default router;