// controllers/snippetController.js

import Snippet from "../models/Snippet.js";
import User from "../models/user.js";


// CREATE SNIPPET
export const createSnippet = async (req, res) => {

  try {

    const {
      title,
      language,
      code,
      tags,
      visibility,
      createdBy
    } = req.body;

    const newSnippet = await Snippet.create({
      title,
      language,
      code,
      tags,
      visibility,
      createdBy:req.user.id
    });

    res.status(201).json({
      message: "Snippet created successfully",
      snippet: newSnippet
    });

  } catch (error) {
   console.log(error); 
    res.status(500).json({
      message: error.message
    });

  }

};


export const getPublicSnippets = async (req, res) => {
  try {

    const snippets = await Snippet.find({ visibility: "public" })
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });

    const formatted = snippets.map((s) => ({
      id: s._id,
      title: s.title,
      language: s.language,
      code: s.code,
      createdBy: s.createdBy?.username,
      createdAt: s.createdAt,
      savedCount: s.savedCount,
    }));

    res.status(200).json(formatted);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SAVE SNIPPET
export const saveSnippet = async (req, res) => {
  try {

    const userId = req.user.id;
    const snippetId = req.params.snippetId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ❌ check duplicate
    if (user.saved.includes(snippetId)) {
      return res.status(400).json({
        message: "Snippet already saved",
      });
    }

    // ✅ add snippet
    user.saved.push(snippetId);
    await user.save();

     await Snippet.findByIdAndUpdate(
      snippetId,
      { $inc: { savedCount: 1 } },
      { new: true }
    );

    res.status(200).json({
      message: "Snippet saved successfully",
      saved: user.saved,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getMySnippets = async (req, res) => {
  try {
    const userId = req.user.id;

    const snippets = await Snippet.find({ createdBy: userId });

    res.status(200).json(snippets);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSavedSnippets = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate({
        path: "saved",
        populate: {
          path: "createdBy",
          select: "username",
        },
      });

    res.status(200).json(user.saved);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



export const updateSnippet = async (req, res) => {
  try {

    const { title, language, code } = req.body;

    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }

    // check owner
    if (snippet.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    snippet.title = title || snippet.title;
    snippet.language = language || snippet.language;
    snippet.code = code || snippet.code;

    await snippet.save();

    res.status(200).json(snippet);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteSnippet = async (req, res) => {
  try {

    const snippet = await Snippet.findById(req.params.id);

    // CHECK SNIPPET EXISTS
    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }

    // CHECK OWNER
    if (snippet.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // DELETE
    await Snippet.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Snippet deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};



export const removeSavedSnippet = async (req, res) => {
  try {

    const userId = req.user.id;
    const snippetId = req.params.snippetId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // REMOVE FROM SAVED ARRAY
    user.saved = user.saved.filter(
      (id) => id.toString() !== snippetId
    );

    await user.save();

    // DECREMENT SAVED COUNT
    await Snippet.findByIdAndUpdate(
      snippetId,
      { $inc: { savedCount: -1 } }
    );

    res.status(200).json({
      message: "Removed from saved",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};