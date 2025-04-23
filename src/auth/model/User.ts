import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // Base64 string
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

export const User = mongoose.models.User || model("User", userSchema);
