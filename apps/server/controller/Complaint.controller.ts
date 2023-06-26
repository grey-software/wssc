import { NextFunction, Request, Response } from "express";
import { ComplaintModel } from "../Models/complaint.schema";

import { Types } from "mongoose";
import { ComplaintValidation } from "../Schema_validation/Complaint_Validation";
import { IComplaint } from "../@types/ComplaintSchema.type";
import { Novu } from "@novu/node";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const novu = new Novu(`${process.env.NOVU_KEY}`);

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
  const userId = req.body.userId;
  const citizenId = req.user.id;
  console.log(userId == citizenId);
  if (userId == citizenId) {
    try {
      const CreateComplaint = new ComplaintModel(req.body);
      await CreateComplaint.save();

      console.log("code" + CreateComplaint.WSSC_CODE);
      // SENDING NOTIFICATION TO ADMING
      await novu.trigger("complaint-status-updated", {
        to: {
          subscriberId: CreateComplaint.WSSC_CODE,
        },
        payload: {
          id: CreateComplaint?._id,
          message: "A New Complaint is filed, Refresh Complaint page to show",
        },
      });

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

// ADD STATEMENT TO COMPLAINT
export const AddStatement = async (req: Request, res: Response) => {
  const complaintId = req.params.id;
  const statement = req.body.wsscStatement;

  try {
    const updated = await ComplaintModel.findByIdAndUpdate(
      complaintId,
      {
        $set: { wsscStatement: statement },
      },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Statement added successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
};

// ASSIGN COMPLAINT TO SUPERVISOR
export const AssignComplaint = async (req: Request, res: Response) => {
  try {
    const supervisorId = req.params.supervisorId;
    const complaintId = req.params.complaintId;

    const assigned = await ComplaintModel.findByIdAndUpdate(
      complaintId,
      {
        $set: { supervisorId: supervisorId },
      },
      { new: true }
    );
    //  CHANGE THE STATUS TO INPROGRESS
    let status = {
      state: "InProgress",
      updateAt: new Date().toLocaleDateString(),
    };
    await ComplaintModel.findByIdAndUpdate(complaintId, {
      $addToSet: { status: status },
    });

    await novu.trigger("complaint-status-updated", {
      to: {
        subscriberId: assigned?.userId,
      },
      payload: {
        id: complaintId,
        message: "Your Complaint is being processed",
      },
    });

    await novu.trigger("complaint-status-updated", {
      to: {
        subscriberId: assigned.supervisorId,
      },
      payload: {
        id: complaintId,
        message:
          "A New Complaint is Assigned to You, Refresh Complaints page to see",
      },
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Status updated successfully",
      data: assigned.data,
    });

    // res.status(200).json({
    //   status: 200,
    //   success: true,
    //   message: "Complaint assigned successfully",
    //   data: assigned,
    // });
  } catch (error) {
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
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
      const response = await novu.trigger("complaint-status-updated", {
        to: {
          subscriberId: complaint?.userId,
        },
        payload: {
          // for now only this string will go to frontend, will modify it once we have connected frontend and backend
          status: "Complaint Status updated Updated",
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
  try {
    let allComplaints;
    let query = {}; // query variable is used to store the userType and will fetch all complaints according to the logged User

    if (req.user.isAdmin) query = { WSSC_CODE: req.user.WSSC_CODE };
    else if (req.user.isSupervisor) query = { supervisorId: userId };
    else query = { userId: userId };

    allComplaints = await ComplaintModel.find(query).sort({ updatedAt: -1 });

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

// GET ALL COMPLAINT FOR SPECIFIC SUPERVISOR

export const GetSupervisorComplaints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the supervisor id from params
  const supervisorId = req.params.id;
  try {
    // get only those complaint in which supervisorId is equal to sent id
    const allComplaints = await ComplaintModel.find({
      supervisorId: supervisorId,
    }).sort({
      _id: -1,
    });

    // send response
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

// CITIZEN FEEDBACK
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

      // SENDING NOTIFICAITON TO CITIZEN
      await novu.trigger("complaint-status-updated", {
        to: {
          subscriberId: updated.userId,
        },
        payload: {
          id: complaintId,
          message: "Your Complaint is Closed",
        },
      });

      await novu.trigger("complaint-status-updated", {
        to: {
          subscriberId: updated.supervisorId,
        },
        payload: {
          id: complaintId,
          message: "Your complaint Assign to you is now closed 🎉",
        },
      });
      console.log(complaint.WSSC_CODE);
      await novu.trigger("complaint-status-updated", {
        to: {
          subscriberId: complaint.WSSC_CODE,
        },
        payload: {
          id: complaintId,
          message:
            "A citizen provided Feedback on complaint, Visit Feedbacks to see",
        },
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

// SUPERVISOR RESPONSE
export const SupervisorResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const LoggedId = req.user.id;
  const complaintId = req.params.id;
  try {
    const complaint:
      | (IComplaint & {
          _id: Types.ObjectId;
          _doc: any;
        })
      | null = await ComplaintModel.findById(complaintId);

    if (complaint.supervisorId == LoggedId) {
      const responded = await ComplaintModel.findByIdAndUpdate(
        complaintId,
        { $set: { response: req.body } },
        { new: true }
      );
      let status = {
        state: "Completed",
        updateAt: new Date().toLocaleDateString(),
      };
      await ComplaintModel.findByIdAndUpdate(complaintId, {
        $addToSet: { status: status },
      });

      // SENDING NOTIFICATION TO CITIZEN
      await novu.trigger("complaint-status-updated", {
        to: {
          subscriberId: responded.userId,
        },
        payload: {
          id: complaintId,
          message: "Your complaint is Resolved, Please give your Feedback",
        },
      });

      res.status(200).json({
        status: 200,
        success: true,
        message: "Response Provided successfully",
        data: responded,
      });
      // next();
    } else {
      res.status(401).json({
        status: 401,
        success: false,
        message: "You are not authorized to provide response to this complaint",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 404, success: false, message: error });
  }
};
