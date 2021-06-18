const { model, Schema } = require("mongoose");
const passwordHash = require("../middlewares/passwordHash");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: "First name is required",
    trim: true,
  },
  lastname: {
    type: String,
    required: "Last name is required",
    trim: true,
  },
  email: {
    type: String,
    required: "Email address is required",
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
    lowercase: true,
  },
  password: {
    type: String,
    required: "Password is required",
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
    required: "Gender is required",
    enum: ["male", "female"],
  },
  diseases: {
    type: String,
    maxLength: 1000,
    trim: true,
  },
});

userSchema.pre("save", passwordHash);
const User = model("User", userSchema);
module.exports = User;