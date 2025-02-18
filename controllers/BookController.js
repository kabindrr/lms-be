import { ResponseClient } from "../middlewares/ResponseClient.js";
import {
  addNewBook,
  getAllBooks,
  getAllPublicBooks,
} from "../models/books/BookModal.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, email, _id } = req.userInfo;
    console.log(fName, email, _id);
    const obj = {
      ...req.body,
      addedBy: {
        name: fName,
        adminId: _id,
      },
      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
    };
    const book = await addNewBook(obj);
    book?._id
      ? ResponseClient({
          req,
          res,
          message: "New book successfully added",
        })
      : ResponseClient({
          req,
          res,
          message: "Unable to add new book now, Please try again later",
        });
  } catch (error) {
    next(error);
  }
};

export const getAllPublicBooksController = async (req, res, next) => {
  try {
    const payload = await getAllPublicBooks();
    return ResponseClient({
      req,
      res,
      payload,
      message: "The book had been added successfully ",
    });
  } catch (error) {
    next(error);
  }
};
export const getAllBooksController = async (req, res, next) => {
  try {
    const payload = await getAllBooks();
    return ResponseClient({
      req,
      res,
      payload,
      message: "The book had been added successfully ",
    });
  } catch (error) {
    next(error);
  }
};
