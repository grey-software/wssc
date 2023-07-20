import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SupervisorModel } from "../Models/supervisor.schema";
import { SupervisorTypes } from "../@types/supervisorSchema.type";
import bycrypt from "bcryptjs";
import { AdminsModel } from "../Models/WsscsAdmin.schema";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY: any = process.env.JWT_KEY;

// REGESTER SUPERVISOR CONTROLLER
export const RegisterSupervisor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const WSSC_CODE = req.user.WSSC_CODE;
  const { name, phone, password } = req.body;

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
      const { password, ...detail } = register._doc;

      res.status(200).json(detail);
    } else {
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

// SIGN IN SUPERVISOR CONTROLLER
export const SignInSupervisor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone, password } = req.body;
  console.log(req.body);
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
      req.body.password,
      verifySupervisor.password
    );
    // CHECKING IF THE PASSWORD IS CORRECT
    if (!verifyPassword)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Password is incorrect",
      });

    // Getting WSSC data which is associated with citizen
    const WSSC: any = await AdminsModel.findOne({ WSSC_CODE: verifySupervisor?.WSSC_CODE });
    const WSSC_DATA = {
      fullname: WSSC.fullname,
      shortname: WSSC.shortname,
      logo: WSSC.logo
    }

    const supervisorToken: string = jwt.sign(
      {
        id: verifySupervisor._id,
        isSupervisor: true,
        WSSC_CODE: verifySupervisor.WSSC_CODE,
      },
      SECRET_KEY
    );

    const { password, ...supervisor } = verifySupervisor._doc;
    // res
    //   .cookie("access_token", supervisorToken, {
    //     httpOnly: true,
    //   })
      res.status(200)
      .json({ success: true, status: 200, supervisor: supervisor, WSSC: WSSC_DATA, supervisorToken });
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

// UPDATE SUPERVISOR INFO CONTROLLER
export const UpdateSupervisor = async (req: Request, res: Response) => {
  const supervisorId: string = req.params.id;
  console.log(supervisorId)
  console.log(req.body)
  try {
    const supervisor = await SupervisorModel.findByIdAndUpdate(
      supervisorId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Supervisor info Updated Successfully",
      data: supervisor,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

// DELETING SUPERVISOR
export const DeleteSupervisor = async (req: Request, res: Response) => {
  const supervisorId: string = req.params.id;

  try {
    await SupervisorModel.findByIdAndUpdate(supervisorId, {
      $set: { isDeleted: true },
    });
    res.status(200)
      .json({
        status: 200,
        success: true,
        message: "Supervisor Deleted Successfully",
      });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

// GET ALL SUPERVISORS
export const GetAllSupervisors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const allSupervisors = await SupervisorModel.find({
      WSSC_CODE: req.user.WSSC_CODE,
      isDeleted: false,
    }).sort({ updatedAt: -1 });

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


// In case of logout, we remove or deleted jwt token from user machine.
export const Logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("inside try section")
    res.status(200)
      .json({
        status: 200,
        success: true,
        message: "Supervisor Signed Out Successfully",
      });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};