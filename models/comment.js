const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


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


// Add pagination plugin
commentSchema.plugin(mongoosePaginate);

module.export = model("Comment", commentSchema);
