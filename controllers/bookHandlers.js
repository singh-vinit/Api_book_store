import { isValidObjectId } from "mongoose";
import { Book } from "../models/book.js";
import { fieldValidator } from "../utils/fieldValidator.js";

export const createNewBook = async (req, res) => {
  try {
    const requiredFields = ["title", "author", "publishYear", "description"];
    if (!fieldValidator(req.body, requiredFields)) {
      res.json({ success: false, message: "All Fields are required!" });
    }

    const { title, author, publishYear, description } = req.body;
    const isBookExist = await Book.findOne({ title });
    if (isBookExist) {
      res.json({ success: false, message: "Book Already Exists!" });
    }

    const newBook = new Book({ title, author, publishYear, description });
    await newBook.save();
    res
      .status(201)
      .json({ success: true, message: "Book Created Successfully" });
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().lean();
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneBook = async (req, res) => {
  try {
    const requiredFields = ["id"];
    if (!fieldValidator(req.params, requiredFields)) {
      res.json({ success: false, message: "Id Field is required!" });
    }
    const { id } = req.params;
    const book = await Book.findOne({ id }).lean();
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateBook = async (req, res) => {
  try {
    const requiredFields = ["id"];
    if (!isValidObjectId(req.params, requiredFields)) {
      res.json({ success: false, message: "Book Id is required!" });
    }
    const { id } = req.params;
    await Book.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json({
      message: "book updated successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const requiredFields = ["id"];
    if (!isValidObjectId(req.params, requiredFields)) {
      res.json({ success: false, message: "Book Id is required!" });
    }
    const deleteBook = await Book.findByIdAndDelete(req.params.id);
    if (deleteBook) {
      res
        .status(200)
        .json({ success: true, message: "book deleted successfully" });
    } else {
      res.json({ success: false, message: "book not found!" });
    }
  } catch (error) {
    throw new Error(error);
  }
};
