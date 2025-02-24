import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    title: {
      type: String,

      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    genre: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    expectedAvailable: {
      type: Date,
      default: null,
    },
    addedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
    lastUpdatedBy: {
      name: {
        type: String,
      },
      adminId: {
        type: mongoose.Types.ObjectId,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
