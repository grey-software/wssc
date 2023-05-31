import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { citizenModel } from "../Models/citizen.schema";
import jwt from "jsonwebtoken";
import { ICitizen } from "../@types/userSchema.type";
import { Types } from "mongoose";
import {
  SignIn_validate,
  SignUp_validate,
} from "../Schema_validation/Auth_Validation";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY: any = process.env.JWT_KEY;

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // first we need to validate the data before saving it in DB
  const { error } = SignUp_validate(req.body);
  // below statement will call if there is data not valid
  if (error) return res.send(error.details[0].message);

  const { name, phone, password }: any = req.body;
  // encrypt password by using bcrypt algorithm
  const salt: string = bcrypt.genSaltSync(10);
  const hash: string = bcrypt.hashSync(password, salt);

  try {
    const verify:
      | (ICitizen & {
          _id: any;
        })
      | null = await citizenModel.findOne({ phone });

    //checking duplicate phone number
    if (!verify) {
      const createUser = new citizenModel({
        name: name,
        phone: phone,
        password: hash,
      });
      await createUser.save();
      res.status(200).json(createUser);
    } else {
      res.status(400).send("This phone number has already registered!");
    }
  } catch (err) {
    // next(err);
    return res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

// ----- sign in -----
export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // first we need to validate the data before saving it in DB
  const { error } = SignIn_validate(req.body);
  if (error) return res.send(error.details[0].message);

  try {
    const User:
      | (ICitizen & {
          _id: Types.ObjectId;
          _doc: any;
        })
      | null = await citizenModel.findOne({ phone: req.body.phone });
    if (!User)
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User is not found!",
      });
    //   now checking password
    const isCorrect: boolean = await bcrypt.compare(
      req.body.password,
      User.password
    );
    // if the password is wrong.
    if (!isCorrect)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password is incorrect",
      });
    // if the user credential is okay then we assign/send jwt token for authentication and authorization
    const token: string = jwt.sign(
      { id: User._id, name: User.name, phone: User.phone },
      SECRET_KEY
    );

    const { password, ...detail } = User._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(detail);
  } catch (error) {
    next(error);
  }
};

// In case of logout, we remove or deleted jwt token from user machine.
export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .clearCookie("access_token", {
        sameSite: "none",
      })
      .status(200)
      .json({
        status: 200,
        success: true,
        message: "User Signed Out Successfully",
      });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};
