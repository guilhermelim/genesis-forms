import mongoose, { Schema, model } from "mongoose";

const registrationSchema = new Schema({
  member: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  observations: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Registration =
  mongoose.models.Registration || model("Registration", registrationSchema);
