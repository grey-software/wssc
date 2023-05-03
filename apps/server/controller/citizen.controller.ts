import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { citizenModel } from "../Models/citizen.schema";
import { ICitizen } from "../@types/userSchema.type";

export const UpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id;
  const citizenId: string = req.citizen.id;

  if (userId == citizenId) {
    try {
      const user:
        | (ICitizen & {
            _id: Types.ObjectId;
            _doc: any;
          })
        | null = await citizenModel.findByIdAndUpdate(userId, req.body, {
        eturnDocument: "after",
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "Account Updated Successfully",
        data: { user },
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        message: error,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      success: false,
      message: "You are not authenticated to update this account",
    });
  }
};

export const GetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id;
  const citizenId: string = req.citizen.id;

  if (userId == citizenId) {
    try {
      const user:
        | (ICitizen & {
            _id: Types.ObjectId;
            _doc: any;
          })
        | null = await citizenModel.findById(req.params.id);
      const { password, ...detail } = user?._doc;
      res.status(200).json(detail);
    } catch (err) {
      next(err);
    }
  } else
    return res.status(403).json({
      status: 403,
      success: false,
      message: "You are not authunticated to get this info",
    });
};

export const RetreiveAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const citizenId: string = req.body.userId;

  try {
    const user:
      | (ICitizen & {
          _id: Types.ObjectId;
          _doc: any;
        })
      | null = await citizenModel.findById(citizenId);

    // Only Admin can retrieve all the users data
    if (user?._doc.isAdmin == true) {
      const allUsers = await citizenModel.find().sort({ _id: -1 });
      res.status(200).json({
        status: 200,
        success: true,
        TotalUsers: allUsers.length,
        data: { allUsers },
      });
    } else {
      res
        .status(404)
        .json({ status: 404, success: false, message: "You are not an Admin" });
    }
  } catch (error) {
    res.status(404).json({ status: 404, success: false, message: error });
  }
};

// In case of account deletion, we can delete complete record of the following users from DB as well as from his local machine.
export const DeleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id; //getting user_Id through params/url
  const LoggedId: string = req.citizen.id; // getting user current logged id.
  // checking whether the logged_id and params_id are same or not, if yes then delete acc otherwise req deny bcz its wrong user
  console.log(userId == LoggedId);
  if (userId == LoggedId) {
    try {
      const validiting = await citizenModel.find(req.body.userId);
      if (validiting) {
        // now deleting account
        await citizenModel.findByIdAndDelete(userId);
        // after deleting accound from DB, we need to clear cookie as well
        res
          .clearCookie("access_token", {
            sameSite: "none",
            secure: true,
          })
          .status(204)
          .json({
            status: 204,
            success: true,
            message: "User Account Deleted Successfuly",
          });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        message: error,
      });
    }
  } else
    return res.status(200).json({
      status: 200,
      success: false,
      message: "You are not authenticated to deleted this account",
    });
};
