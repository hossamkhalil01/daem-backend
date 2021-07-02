const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const notificationSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      enum: ["application", "comment"],
      required : true
    },
    actor: {
      type: String,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
    appStatus :{
      type: String,
      enum: ["rejected", "approved"],
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Add pagination plugin
notificationSchema.plugin(mongoosePaginate);
module.exports = model("Notification", notificationSchema);
