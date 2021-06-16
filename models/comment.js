const { model, Schema } = require("mongoose");
const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
    body: {
      type: String,
      maxLength: 2000,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.export = Comment;
