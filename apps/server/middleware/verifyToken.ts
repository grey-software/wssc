import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { createError } from "../HandleError";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line turbo/no-undeclared-env-vars
const JWT: any = process.env.JWT_KEY;

// ----- verify citizen token -------------
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // const token: any = req.cookies.access_token;
  const token: any = req.headers.authorization.split(" ")[1];
  if (!token) return next(createError(401, "You are not authenticated!"));

  try {
    const payload = jwt.verify(token, JWT);
    req.user = payload;
    next();
  } catch (err) {
    next(createError(403, "Token is not valid!"));
  }
};

// ----- verifyUser before making any request --------
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res
          .status(403)
          .json({ status: 403, message: "You are not authorized!" });
      }
    });
  } catch (error) {
    next(error);
  }
};

// ------ verify and create middleware for WSSC Admin as well  ------
export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res
          .status(403)
          .json({ status: 403, message: "Sorry, You are not authorized" });
      }
    });
  } catch (error) {
    next(error);
  }
};

// ------ verify and create middleware for WSSC Admin as well  ------
export const verifySupervisor = (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.isSupervisor || req.user.isAdmin) {
        next();
      } else {
        return res
          .status(403)
          .json({ status: 403, message: "Sorry, You are not authorized" });
      }
    });
  } catch (error) {
    next(error);
  }
};
