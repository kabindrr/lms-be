import express from "express";
import {
  deleteBookController,
  getAllBooksController,
  getAllPublicBooksController,
  insertNewBook,
  updateBookController,
} from "../controllers/BookController.js";
import {
  adminAuthMiddleware,
  userAuthMiddleWare,
} from "../middlewares/AuthMiddleWare.js";
import {
  newBookDataValidation,
  updateBookDataValidation,
} from "../middlewares/validation/BookDataValidation.js";

import { upload } from "../utils/multer.js";

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
  upload.single("image"),
  // upload.array("image", 2),
  newBookDataValidation,
  insertNewBook
);

// update book
BookRouter.put(
  "/",
  userAuthMiddleWare,
  adminAuthMiddleware,
  upload.array("images", 2),
  updateBookDataValidation,
  updateBookController
);

//delete Book
BookRouter.delete(
  "/:_id",
  userAuthMiddleWare,
  adminAuthMiddleware,

  deleteBookController
);

export default BookRouter;
