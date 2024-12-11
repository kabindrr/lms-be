import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URL;

export const MongoDbConfig = async () => {
  try {
    console.log(uri);
    await mongoose.connect(uri);
    // await mongoose.connect("mongodb://localhost:27017/lmsdb2");
    console.log("Database connected with mongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
