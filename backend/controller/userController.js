// controllers/userController.js

import User from "../models/User.js";
import jwt from "jsonwebtoken";


// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // create user
    const newUser = await User.create({
      username,
      email,
      phoneNumber,
      password,
    });

    // create token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // check password
    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const getUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};
