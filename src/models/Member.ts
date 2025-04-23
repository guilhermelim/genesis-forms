import mongoose, { Schema, model } from "mongoose";

const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Member = mongoose.models.Member || model("Member", memberSchema);
