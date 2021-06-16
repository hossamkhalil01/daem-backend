const { model, Schema } = require("mongoose");
const urgencyLevel = require("../utils/urgencyLevel");

const ticketSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      maxLength: 200,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxLength: 2000,
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
    },
  },
  { timestamps: true }
);

const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;
