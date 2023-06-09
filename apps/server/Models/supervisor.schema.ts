import mongoose from "mongoose";
import { SupervisorTypes } from "../@types/supervisorSchema.type";

const SupervisorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Supervisor must have a name"],
    },
    WSSC_CODE: {
      type: String,
      required: [true, "please validate your organization code"],
    },
    phone: {
      type: String,
      required: [true, "Supervisor must have a phone number"],
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    isDeleted: { type: Boolean, default: false },
    profile_image: { type: String },
  },
  { timestamps: true }
);

export const SupervisorModel =
  mongoose.models.Supervisors ||
  mongoose.model<SupervisorTypes>("supervisors", SupervisorSchema);
