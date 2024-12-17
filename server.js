import express, { json } from "express";
import cors from "cors";
import { MongoDbConfig } from "./database/mongoDbConfig.js";
import morgan from "morgan";
import dotenv from "dotenv";
import { UserRouter } from "./routers/UserRouter.js";
import { AuthRoute } from "./routers/AuthRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Database

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/auth", AuthRoute);
// app.use("/api/v1/user", UserRouter);

//server status
app.get("/", (req, res) => {
  res.json({
    status: "Success",
    message: "Server is Live",
  });
});

MongoDbConfig()
  .then((error) => {
    app.listen(PORT, (error) => {
      error
        ? console.log("Server error")
        : console.log(`Server Connected at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
