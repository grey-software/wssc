import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { citizenModel } from "../Models/citizen.schema";
import { ICitizen } from "../@types/userSchema.type";
import bcrypt from "bcryptjs";

// update user info
export const UpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id;
  const citizenId: string = req.user.id;
  console.log(req.body);
  if (userId == citizenId || req.user.isAdmin) {
    try {
      const updateInfo:
        | (ICitizen & {
            _id: Types.ObjectId;
            _doc: any;
          })
        | null = await citizenModel.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).json({
        status: 200,
        success: true,
        message: "Account Updated Successfully",
        updateInfo,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: error,
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      success: false,
      message: "You are not authenticated to update this account",
    });
  }
};

// get a single user info
export const GetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id;
  const citizenId: string = req.user.id;

  if (userId == citizenId || req.user.isAdmin) {
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

// RetreiveAllUsers Controller
export const RetreiveAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // Only Admin can retrieve all the users data
    const code = req.user.WSSC_CODE;
    const allUsers = await citizenModel
      .find({ WSSC_CODE: code })
      .sort({ updatedAt: -1 });

    res.status(200).json({
      status: 200,
      success: true,
      TotalUsers: allUsers.length, 
      data: { allUsers }, 
    });
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
  const LoggedId: string = req.user.id; // getting user current logged id.
  // checking whether the logged_id and params_id are same or not, if not then request will denay because its wrong user

  if (userId == LoggedId || req.user.isAdmin) {
    try {
      const validiting = await citizenModel.find(req.body.userId);
      if (validiting) {
        // now deleting account
        await citizenModel.findByIdAndDelete(userId);
        // after deleting accound from DB, we need to clear cookie as well
        res
          .clearCookie("access_token", {
            sameSite: "none",
          })
          .status(200)
          .json({
            status: 200,
            success: true,
            message: "Account Deleted Successfuly",
          });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        success: false,
        message: error,
      });
    }
  } else
    return res.status(401).json({
      status: 401,
      success: false,
      message: "You are not authenticated to deleted this account",
    });
};

// change password controller
export const ChangePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id; //getting user_Id through params/url
  const LoggedId: string = req.user.id; // getting user current logged id.
  // checking whether the logged_id and params_id are same or not, if not then request will denay because its wrong user
  if (userId == LoggedId) {
    // encrypt password by using bcrypt algorithm
    const salt: string = bcrypt.genSaltSync(10);
    const HashedPassword: any = bcrypt.hashSync(req.body.password, salt);

    try {
      await citizenModel.findByIdAndUpdate(
        userId,
        { password: HashedPassword },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: 200,
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        message: error,
      });
    }
  } else
    return res.status(401).json({
      status: 200,
      success: false,
      message: "You are not authenticated to change password",
    });
};
