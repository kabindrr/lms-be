import express from "express";
import { insertNewBook } from "../controllers/BookController.js";

const BookRouter = express.Router();

BookRouter.get("/", (req, res, next) => {
  res.json("todo");
});

BookRouter.post("/", insertNewBook);

export default BookRouter;
