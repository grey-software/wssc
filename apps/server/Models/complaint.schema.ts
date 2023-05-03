import mongoose from "mongoose";
import { IComplaint } from "../@types/ComplaintSchema.type";

const ComplaintSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "CurrentUser_Id is required"] },
    complaintAddress: {
      type: String,
      required: [true, "Complaint address is required"],
    },
    complaintType: {
      type: String,
      required: [true, "Complaint type is mandatory one"],
    },
    complaintDes: { type: String },
    feedback: {
      type: {
        rating: {
          type: Number,
          required: [true, "Rating is required in feedback"],
        },
        description: String,
      },
    },
    imageUrl: { type: String },
    videoUrl: { type: String },
    status: {
      type: [
        {
          state: { type: String, default: "Initiated" },
          updatedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export const ComplaintModel =
  mongoose.models.complaint ||
  mongoose.model<IComplaint>("complaint", ComplaintSchema);
