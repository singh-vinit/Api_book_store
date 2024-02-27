import express from 'express';
const router = express.Router();

import { createNewBook, deleteBook, getAllBooks, getOneBook, updateBook } from '../controllers/bookHandlers.js';

router.get("/all", getAllBooks);
router.post("/new", createNewBook);
router.get("/:id", getOneBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;


