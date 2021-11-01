const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    snippet: {
      type: String,
      required: [true, "Snippet is required"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
  },
  {
    timestamps: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
