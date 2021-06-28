const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const articleSchema = new Schema(
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
      required: true
    },
  },
  { timestamps: true }
);


// Add pagination plugin
articleSchema.plugin(mongoosePaginate);
module.exports = model("Article", articleSchema);