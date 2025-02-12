import BookSchema from "./BookSchema.js";

export const addNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};
