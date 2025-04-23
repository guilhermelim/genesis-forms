import mongoose, { Schema, model } from "mongoose";

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Service =
  mongoose.models.Service || model("Service", serviceSchema);
