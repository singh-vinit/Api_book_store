import { Book } from "../models/book.js";

export const createNewBook = async (req, res) => {
  try {
    const { title, author, publishYear, description } = req.body;
    if (!title || !author || !publishYear || !description) {
      return res.status(400).json({ message: "all fields are required" });
    }
    await Book.create({
      title,
      author,
      publishYear,
      description,
    });
    return res
      .status(201)
      .json({ success: true, message: "created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong!" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      message: "something went wrong!",
    });
  }
};

export const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      message: "something went wrong!",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, author, publishYear, description } = req.body;
    if (!title || !author || !publishYear || !description) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.send(404).json({ message: "book not found" });
    }
    return res.status(200).json({
      message: "book updated successfully",
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      message: "something went wrong!",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }
    res.status(200).json({ message: "book deleted successfully" });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ message: "something went wrong!" });
  }
};
