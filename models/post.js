const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxLength: 200,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      maxLength: 4000,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;
