import { NextFunction, Request, Response } from "express";
import { AdminsModel } from "../Models/WsscsAdmin.schema";
import bcrypt from 'bcryptjs'
import { WSSC_TYPES } from "../@types/WSSC'sSchema.type";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY: any = process.env.JWT_KEY;

export const Register = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { name, WSSC_CODE, password, isAdmin } = req.body;
// checking whether there is same wssc organization registered or not
    // encrypt password by using bcrypt algorithm
    const salt: string = bcrypt.genSaltSync(10);
    const hashPassword: string = bcrypt.hashSync(password, salt);
    console.log(hashPassword)
    try {
    const admin = await AdminsModel.findOne( {WSSC_CODE: req.body.WSSC_CODE} );
    console.log(admin)
        if (!admin ) {
        
        const RegisterWSSC: any = new AdminsModel({name: name, WSSC_CODE: WSSC_CODE, isAdmin: isAdmin, password: hashPassword})
            await RegisterWSSC.save();
        
        const { password, ...detail } = RegisterWSSC._doc;
            res.status(200).json({ success: true, status: 200, ...detail })
        }
    else {
        res.status(403).json({success: false, status: 403, message: "this organization has already registered!"})
        }
        
    } catch (error) {
      res.status(500).json({success: false, status: 500, error})
    }
}

// SignIn controller
export const SignIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const { WSSC_Code, password } = req.body;
    console.log(req.body)
    // first we need to validate the data before saving it in DB
    // const { error } = SignIn_validate(req.body);
    // if (error) return res.send(error.details[0].message);

    try {
        const admin:
            | (WSSC_TYPES & {
                _id: Types.ObjectId;
                _doc: any;
            })
            | null = await AdminsModel.findOne({WSSC_CODE: req.body.WSSC_CODE});
        if (!admin)
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Wrong Credentials",
            });
        // Now checking password
        const isCorrect: boolean = await bcrypt.compare(
            req.body.password,
            admin.password
        );

        // if the password is wrong.
        if (!isCorrect)
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password is incorrect",
            });
        // if the user credential is okay then we assign/send jwt token for authentication and authorization
        const token = jwt.sign({ id: admin._id, name: admin.name, isAdmin: admin.isAdmin, orgCode:admin.WSSC_CODE }, SECRET_KEY)
        const { password, ...detail } = admin._doc;

        res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(detail);
    }catch(error) {
        res.status(500).json({success: false, status: 500, errorMessage: error})
    }
};

// In case of logout, we remove or deleted jwt token.
export const AdminLogout = async (
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
                message: "Admin Signed Out Successfully",
            });
    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error,
        });
    }
};
