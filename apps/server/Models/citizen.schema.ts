import mongoose from "mongoose";
import { ICitizen } from "../@types/userSchema.type";
import validator from "validator";

const citizenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Citizen must have a name"],
    },
    phone: {
      type: Number,
      required: [true, "Citizen must have a phone number"],
      index: true,
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    WSSC_CODE: { type: String, required: [true, "WSSC code is required"] },
    address: { type: String },
    profile_image: { type: String },
  },
  { timestamps: true }
);

export const citizenModel = mongoose.model<ICitizen>("citizens", citizenSchema);
