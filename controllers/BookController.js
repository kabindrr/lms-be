import slugify from "slugify";
import { ResponseClient } from "../middlewares/ResponseClient.js";
import {
  addNewBook,
  deleteBook,
  findABook,
  getAllBooks,
  getAllPublicBooks,
  updateBook,
} from "../models/books/BookModal.js";
import { deleteFiles } from "../utils/fileUtils.js";

export const insertNewBook = async (req, res, next) => {
  console.log(300, req.files);
  try {
    const { fName, email, _id } = req.userInfo;
    const { path } = req.file;

    console.log(fName, email, _id, path);
    const obj = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      addedBy: {
        name: fName,
        adminId: _id,
      },
      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
      imgUrl: path,
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
    if (error.message.includes("E11000 duplicate key")) {
      return ResponseClient({
        req,
        res,
        statusCode: 400,
        message:
          "Duplicate data not allowed: " + JSON.stringify(error.keyValue),
      });
    }
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
export const getSingleBookController = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const payload = await findABook({ slug, status: "active" });
    return ResponseClient({
      req,
      res,
      payload,
      message: "Book Found successfully ",
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
export const updateBookController = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    console.log(req.files);
    req.body.imageList = req.body.imageList.split(",");
    //remove imageToDelete list from imageList
    if (req.body.imageToDelete && req.body.imageToDelete.length) {
      req.body.imageList = req.body.imageList.filter(
        (img) => !req.body.imageToDelete.includes(img)
      );

      req.body.imageToDelete.map((img) => deleteFiles(img));
    }

    if (req.files && Array.isArray(req.files)) {
      req.body.imageList = [
        ...req.body.imageList,
        ...req.files.map((file) => file.path),
      ];
    }

    const obj = {
      ...req.body,

      lastUpdatedBy: {
        name: fName,
        adminId: _id,
      },
    };
    const book = await updateBook(obj);
    book?._id
      ? ResponseClient({
          req,
          res,
          message: "Book Updated successfully",
        })
      : ResponseClient({
          req,
          res,
          message: "Unable to update  book now, Please try again later",
        });
  } catch (error) {
    next(error);
  }
};

export const deleteBookController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const book = await deleteBook(_id);
    book.imageList.map((img) => deleteFiles(img));

    console.log(book);
    book?._id
      ? ResponseClient({
          req,
          res,
          message: "Book deleted successfully",
        })
      : ResponseClient({
          req,
          res,
          message: "Unable to delete the book now, Please try again later",
        });
  } catch (error) {
    next(error);
  }
};
