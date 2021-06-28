const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const articleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      minLength: [3, "Title must be at least 3 chars"],
      maxLength: [200, "Title must not exceed 200 chars"],
      required: "Title is required",
      trim: true,
    },
    body: {
      type: String,
      minLength: [10, "Body must be at least 10 chars"],
      maxLength: [4000, "Body must not exceed 4000 chars"],
      required: "Body is required",
      trim: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Add pagination plugin
articleSchema.plugin(mongoosePaginate);
module.exports = model("Article", articleSchema);
