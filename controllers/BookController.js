export const insertNewBook = (req, res, next) => {
  console.log(req.body);
  res.json({ status: "success", message: "Added new book" });
};
