const { model, Schema } = require("mongoose");
const urgencyLevel = require("../utils/urgencyLevel");
const mongoosePaginate = require("mongoose-paginate-v2");

const ticketSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      minLength: [3, "Subject must be at least 3 chars"],
      maxLength: [200, "Subject must not exceed 200 chars"],
      required: "Subject is required",
      required: true,
      trim: true,
    },
    description: {
      type: String,
      minLength: [10, "Description must be at least 10 chars"],
      maxLength: [2000, "Description must not exceed 4000 chars"],
      required: "Description is required",
      required: true,
      trim: true,
    },
    images: {
      type: [String],
    },
    state: {
      type: String,
      enum: ["unresolved", "resolved", "expired"],
      default: "unresolved",
    },
    urgency: {
      type: Number,
      enum: [
        urgencyLevel.LOW,
        urgencyLevel.MEDIUM,
        urgencyLevel.HIGH,
        urgencyLevel.CRITICAL,
      ],
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Add pagination plugin
ticketSchema.plugin(mongoosePaginate);

module.exports = model("Ticket", ticketSchema);
