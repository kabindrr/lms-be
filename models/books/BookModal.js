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
  return BookSchema.findByIdAndUpdate(_id, rest, {
    new: true,
    runValidators: true,
    strict: false,
  });
};

//delete book
export const deleteBook = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};

//import many books
export const createManyBooks = (booksArg) => {
  return BookSchema.insertMany(booksArg);
};

//get a single book, filter = {slug,status:"active"}
export const findABook = (filter) => {
  return BookSchema.findOne(filter);
};
