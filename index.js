import express from "express";
import dotenv from "dotenv";
import connectDB from "./database.js";
import bookRoutes from "./routes/bookRoutes.js";
import signupRoute from "./routes/signupRoute.js";
import cors from "cors";

const app = express();
dotenv.config({
  path: "./config.env",
});

// database connection
connectDB(process.env.DBURL.replace("<password>", process.env.DBPASSWORD))
  .then(() => {
    console.log("connected to database...");
  })
  .catch((err) => console.log(err));

// middlewares
app.use(express.json()); // parse the json data
app.use(cors());
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/user", signupRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `server is working on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
