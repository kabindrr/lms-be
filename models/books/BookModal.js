import BookSchema from "./BookSchema.js";

export const addNewBook = (bookObj) => {
  return BookSchema(bookObj).save();
};

export const getAllPublicBooks = () => {
  return BookSchema.find({ status: "active" });
};
export const getAllBooks = () => {
  return BookSchema.find();
};
//Update book
export const updateBook = ({ _id, ...rest }) => {
  return BookSchema.findByIdAndUpdate(_id, rest);
};
