import express from "express";
import {
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
} from "../controllers/BookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleWare,
} from "../middlewares/AuthMiddleWare.js";
import { newBookDataValidation } from "../middlewares/validation/BookDataValidation.js";

const BookRouter = express.Router();

//public api access
BookRouter.get("/", getAllPublicBooksController);

//admin only access
BookRouter.get(
  "/admin",
  userAuthMiddleWare,
  adminAuthMiddleware,
  getAllBooksController
);

BookRouter.post(
  "/",
  userAuthMiddleWare,
  adminAuthMiddleware,
  newBookDataValidation,
  insertNewBook
);

export default BookRouter;
