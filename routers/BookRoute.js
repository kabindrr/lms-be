import express from "express";
import { insertNewBook } from "../controllers/BookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleWare,
} from "../middlewares/AuthMiddleWare.js";
import { newBookDataValidation } from "../middlewares/validation/BookDataValidation.js";

const BookRouter = express.Router();

BookRouter.get("/", (req, res, next) => {
  res.json("todo");
});

BookRouter.post(
  "/",
  userAuthMiddleWare,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook
);

export default BookRouter;
