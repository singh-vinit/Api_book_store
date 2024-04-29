import express from "express";
import dotenv from "dotenv";
import connectDB from "./database.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;
dotenv.config({
  path: "./config.env",
});

mongoose.connect(
  process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD)
);

// middlewares
app.use(express.json()); // parse the json data
app.use(cors());
app.use("/api/v1/books", bookRoutes);

//global catch
app.use(function (err, req, res, next) {
  const statusCode = err.status || 500;
  const errMessage = err.message || "Internal Server Error";
  res.status(statusCode).json({ message: errMessage });
});

app.listen(port, () => {
  console.log(
    `server is working on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});