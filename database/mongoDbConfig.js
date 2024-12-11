import mongoose from "mongoose";

const uri = process.env.MONGO_URL;

export const MongoDb = () => {
  try {
    mongoose.connect(uri);
    console.log("Database connected with mongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
