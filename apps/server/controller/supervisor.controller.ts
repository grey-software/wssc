import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SupervisorModel } from "../Models/supervisor.schema";
import { SupervisorTypes } from "../@types/supervisorSchema.type";
import bycrypt from "bcryptjs";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY: any = process.env.JWT_KEY;

// REGESTER SUPERVISOR
export const RegisterSupervisor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, WSSC_CODE, phone, password } = req.body;

  // ENCRYPTING PASSWORD
  const salt: string = bycrypt.genSaltSync(10);
  const hash: string = bycrypt.hashSync(password, salt);

  try {
    const verifySupervisor:
      | (SupervisorTypes & {
          _id: any;
        })
      | null = await SupervisorModel.findOne({ phone });

    if (!verifySupervisor) {
      const register = new SupervisorModel({
        name: name,
        phone: phone,
        WSSC_CODE: WSSC_CODE,
        password: hash,
      });
      await register.save();
      res.status(200).json(register);
    }
    {
      res.status(400).json({
        status: 400,
        success: false,
        message: "This phone number is already registered!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

// SIGN IN SUPERVISOR
export const SignInSupervisor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone, password } = req.body;
  try {
    const verifySupervisor:
      | (SupervisorTypes & {
          _id: any;
          _doc: any;
        })
      | null = await SupervisorModel.findOne({ phone });

    // CHECKING IF THE SUPERVISOR EXISTS
    if (!verifySupervisor) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User is not found!",
      });
    }

    const verifyPassword: boolean = await bycrypt.compare(
      password,
      verifySupervisor.password
    );
    // CHECKING IF THE PASSWORD IS CORRECT
    if (!verifyPassword)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password is incorrect",
      });

    const token: string = jwt.sign(
      {
        id: verifySupervisor._id,
        phone: verifySupervisor.phone,
        WSSC_CODE: verifySupervisor.WSSC_CODE,
      },
      SECRET_KEY
    );

    const supervisor = verifySupervisor._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(supervisor);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE SUPERVISOR
export const GetSupervisor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id;
  try {
    const supervisor:
      | (SupervisorTypes & {
          _id: any;
          _doc: any;
        })
      | null = await SupervisorModel.findById(userId);

    res.status(200).json({
      status: 200,
      success: true,
      data: supervisor,
    });
  } catch (error) {
    res.status(404).json({ status: 404, success: false, message: error });
  }
};

// GET ALL SUPERVISORS
export const GetAllSupervisors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allSupervisors = await SupervisorModel.find().sort({ _id: -1 });

    res.status(200).json({
      status: 200,
      success: true,
      Results: allSupervisors.length,
      data: allSupervisors,
    });
  } catch (error) {
    res.status(404).json({ status: 404, success: false, message: error });
  }
};
