import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "default.png",
  },
  DOB: {
    type: Date,
  },
  role: {
    type: String,
    required: true,
    enum: ["moderator", "user", "doctor"],
    default: "user",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  diseases: {
    type: String,
    maxLength: 1000,
    trim: true,
  },
});

userSchema.virtual("age").get(function () {
  return Math.floor(
    (Date.now() - this.DOB.getTime()) / (1000 * 3600 * 24 * 365)
  );
});

const User = model("User", userSchema);
export default User;
