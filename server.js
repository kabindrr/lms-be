import express, { json } from "express";
import cors from "cors";
import { MongoDbConfig } from "./database/mongoDbConfig.js";
import morgan from "morgan";
import dotenv from "dotenv";
import { UserRouter } from "./routers/UserRouter.js";
import { AuthRoute } from "./routers/AuthRoute.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import { ResponseClient } from "./middlewares/ResponseClient.js";
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

//server status
app.get("/", (req, res) => {
  const message = "Server is Live";
  ResponseClient({ req, res, message });
});

app.use(errorHandler);

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
