// connect your database

import { MongoDbConfig } from "../../database/mongoDbConfig.js";
import { createManyBooks } from "../../models/books/BookModal.js";
import bookData from "../../seeds/BookSeeds/book-seeds.js";

//model

const importData = async () => {
  try {
    await MongoDbConfig();

    //call empty database

    // call function bulk import

    await createManyBooks(bookData);
  } catch (error) {
    console.log(error);
  }
};

importData();
