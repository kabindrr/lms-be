import BookSchema from "./BookSchema.js";

export const createNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};
