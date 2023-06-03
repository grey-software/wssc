import { NextFunction, Request, Response } from "express";
import { ComplaintModel } from "../Models/complaint.schema";

import { Types } from "mongoose";
import { ComplaintValidation } from "../Schema_validation/Complaint_Validation";
import { IComplaint } from "../@types/ComplaintSchema.type";
import { Novu } from "@novu/node";

// create complaint method definition
export const CreateComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // first we need to validate the data before saving it in DB
  const { error }: any = ComplaintValidation(req.body);
  // below statement will call if there is invalid data recieved in req.body
  if (error) return res.send(error.details[0].message);
  const userId = req.params.id;
  const citizenId = req.user.id;

  if (userId == citizenId) {
    try {
      const CreateComplaint = new ComplaintModel(req.body);
      await CreateComplaint.save();
      res.status(200).json({ status: 200, success: true, CreateComplaint });
    } catch (error) {
      res.status(404).json({ status: 404, success: false, message: error });
    }
  } else
    res.status(303).json({
      status: 303,
      success: false,
      message: "You are not authenticated",
    });
};

// Get a single complaint
export const GetComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const complaintId = req.params.id;

  try {
    const complaint:
      | (IComplaint & {
          _id: Types.ObjectId;
          _doc: any;
        })
      | null = await ComplaintModel.findById({
      _id: complaintId,
    });
    res.status(200).json({
      status: 200,
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error,
    });
  }
};

export const UpdateComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const complaintId = req.params.id;
  try {
    // To check if the current user is admin, Only admin can update the complaint
    if (req.user.isAdmin) {
      const complaint:
        | (IComplaint & {
            _id: Types.ObjectId;
            _doc: any;
          })
        | null = await ComplaintModel.findById(complaintId);
      let status;
      let statusLength = complaint?.status.length;
      // pushing the next status based on the previous status
      if (statusLength == 1) {
        status = {
          state: "InProgress",
          updateAt: new Date().toLocaleDateString(),
        };
      } else if (statusLength == 2) {
        status = {
          state: "Completed",
          updateAt: new Date().toLocaleDateString(),
        };
      } else {
        status = { state: "Closed", updateAt: new Date().toLocaleDateString() };
      }
      const updated = await ComplaintModel.findByIdAndUpdate(complaintId, {
        $addToSet: { status: status },
      });

      // Sending Notification to user
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      const novu = new Novu(`${process.env.NOVU_KEY}`);

      const response = await novu.trigger("complaint-status-updated", {
        to: {
          subscriberId: `${complaint?.userId}`,
        },
        payload: {
          // for now only this string will go to frontend, will modify it once we have connected frontend and backend
          status: "Complaint Updated",
        },
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "Status updated successfully",
        data: response.data,
      });
    } else {
      res.status(303).json({
        status: 303,
        success: false,
        message: "You are not authorized to update complaint",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

// Get All complaints
export const GetAllComplaints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  console.log(req.user.id == req.params.id);
  let allComplaints;
  try {
    if (req.user.isAdmin) {
      allComplaints = await ComplaintModel.find().sort({ _id: -1 });
    } else {
      allComplaints = await ComplaintModel.find({ userId: userId }).sort({
        _id: -1,
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      TotalComplaints: allComplaints.length,
      allComplaints,
    });
  } catch (error) {
    res.status(404).json({ status: 404, success: false, message: error });
  }
};

// delete all complaints

export const DeleteAllcomplaints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const LoggedId = req.user.id;
  const userId = req.params.id;

  if (LoggedId == userId) {
    try {
      await ComplaintModel.deleteMany({ userId });
      res.status(200).json({
        status: 200,
        success: true,
        message: "All complaints deleted successfully",
      });
    } catch (error) {
      res.status(404).json({ status: 404, success: false, message: error });
    }
  } else {
    res.status(401).json({
      status: 401,
      success: false,
      message: "You are not authorized to delete complaints",
    });
  }
};

export const CitizenFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const LoggedId = req.user.id;
  const complaintId = req.params.id;
  const { rating, description } = req.body;
  let feedback = {
    rating: rating,
    description: description,
  };
  try {
    const complaint:
      | (IComplaint & {
          _id: Types.ObjectId;
          _doc: any;
        })
      | null = await ComplaintModel.findById(complaintId);

    if (complaint.userId == LoggedId) {
      const updated = await ComplaintModel.findByIdAndUpdate(
        complaintId,
        { $set: { feedback } },
        { new: true }
      );
      console.log(updated);
      let status = {
        state: "Closed",
        updateAt: new Date().toLocaleDateString(),
      };
      await ComplaintModel.findByIdAndUpdate(complaintId, {
        $addToSet: { status: status },
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "Feedback Provided successfully",
        data: updated,
      });
    } else {
      res.status(401).json({
        status: 401,
        success: false,
        message: "You are not authorized to provide feedback on this complaint",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 404, success: false, message: error });
  }
};
