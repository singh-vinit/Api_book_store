import { SignUp } from "../models/signup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await SignUp.findOne({ email });
    if (user) {
      return res.json({
        success: false,
        message: "user already exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = await SignUp.create({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: "successfully registered",
      });
  } catch (err) {
    return res.status(400).json({
      error: err,
      message: "all fields are required",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await SignUp.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "Invalid email or password" });
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ success: false, message: "Invalid password" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message: `welcome back ${user.name}`,
    });
};

export const logoutUser = async (req, res) => {
  try {
    res.status(200).cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "some error" });
  }
};
