import mongoose from "mongoose";
import { IComplaint } from "../@types/ComplaintSchema.type";

const ComplaintSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "CurrentUser_Id is required"] },
    userName: { type: String },
    phone: { type: String },
    complaintAddress: {
      type: String,
      required: [true, "Complaint address is required"],
    },
    complaintType: {
      type: String,
      required: [true, "Complaint type is mandatory one"],
    },
    complaintDes: { type: String },
    wsscStatement: { type: String },
    status: {
      type: [
        {
          state: { type: String },
          updatedAt: {
            type: Date,
            default: new Date(),
          },
          _id: false,
        },
      ],
      default: [{ state: "Initiated" }],
    },
    feedback: {
      type: {
        rating: {
          type: Number,
          required: [true, "Rating is required in feedback"],
        },
        description: String,
      },
    },
    ImageUrl: { type: String },
    VideoUrl: { type: String },
  },
  { timestamps: true }
);

export const ComplaintModel =
  mongoose.models.complaint ||
  mongoose.model<IComplaint>("complaint", ComplaintSchema);
