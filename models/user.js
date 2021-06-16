const { model, Schema } = require("mongoose");
const passwordHash = require("../middlewares/passwordHash");

const userSchema = new Schema({
  firstname: {
    type: String,
    required: "First name is required",
    trim: true,
    minLength: [3, "First name must be at least 3 chars"],
    maxLength: [25, "First name must not exceed 25 chars"],
  },
  lastname: {
    type: String,
    required: "Last name is required",
    trim: true,
    minLength: [3, "Last name must be at least 3 chars"],
    maxLength: [25, "Last name must not exceed 25 chars"],
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
    minLength: [8, "Password must be at least 8 chars"],
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

userSchema.virtual("age").get(function () {
  return Math.floor(
    (Date.now() - this.DOB.getTime()) / (1000 * 3600 * 24 * 365)
  );
});

// apply password hash hook
userSchema.pre("save", passwordHash);

const User = model("User", userSchema);

module.exports = User;
