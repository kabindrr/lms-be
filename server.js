import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  error
    ? console.log("Server error")
    : console.log(`Server Connected at http://localhost:${PORT}`);
});
