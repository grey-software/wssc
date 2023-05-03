import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { createError } from "../HandleError";
import dotenv from 'dotenv';
dotenv.config();

const JWT:any = process.env.JWT_KEY;
// ----- verify citizen token -------------
export const verifyCitizenToken = async (req: Request, res:Response, next: NextFunction) => {

        const token: any = req.cookies.access_token;

        if (!token) return next(createError(401, "You are not authenticated!"));

        jwt.verify(token, JWT, (err: jwt.VerifyErrors | null, user: any) => {
            if (err) return next(createError(403, "Token is not valid!"));

            req.citizen = user;
            next()
        });
    };

// ----- verify Chief officer token --------
export const verif_Chief_offcer_Token = async (req: Request, res: Response, next: NextFunction) => {
    // ... coding here
}

// ------- verify sanitation team token ------------
export const verif_sanitationTeam_Token = async (req: Request, res: Response, next: NextFunction) => {
    // ... coding here
}

// ------- verify super admin token --------
export const verif_superAdmin_Token = async (req: Request, res: Response, next: NextFunction) => {
    // ... coding here
}