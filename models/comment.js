const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
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


// Add pagination plugin
commentSchema.plugin(mongoosePaginate);

module.exports = model("Comment", commentSchema);
