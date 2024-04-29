import express from "express";
const router = express.Router();

import {
  createNewBook,
  deleteBook,
  getAllBooks,
  getOneBook,
  updateBook,
} from "../controllers/bookHandlers.js";

router.get("/all", getAllBooks);
router.post("/new", createNewBook);
router.get("/get/:id", getOneBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router;
