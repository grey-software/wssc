import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { createError } from "../HandleError";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line turbo/no-undeclared-env-vars
const JWT: any = process.env.JWT_KEY;
// ----- verify citizen token -------------
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not authenticated!"));

  return new Promise<void>((resolve, reject) => {
    jwt.verify(token, JWT, (err: VerifyErrors | null, payload: any) => {
      if (err) return reject(createError(403, "Token is not valid!"));

      req.user = payload;
      resolve();
    });
  });

  // jwt.verify(token, JWT, (err: jwt.VerifyErrors | null, user: any) => {
  //     if (err) return next(createError(403, "Token is not valid!"));

  //     req.citizen = user;
  //     console.log(req.citizen)
  //     next()
  // });
};

// ----- verifyUser before making any request --------
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await verifyToken(req, res, next);
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "You are not authorized!" });
    }
  } catch (error) {
    next(error);
  }
};

// ------ verify and create middleware for WSSC Admin as well  ------
export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await verifyToken(req, res, next);
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ status: 403, message: "Sorry, You are not authorized" });
    }
  } catch (error) {
    next(error);
  }
};

// ----- verifyUser before making any request --------
// export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
//     console.log('this is verifyUser section')
//     verifyToken(req, res, next, () => {

//         if (req.user.id == req.params.id || req.citizen.isAdmin) {
//             next()
//         } else {
//              return res.status(403).json({status: 403, message: "You are not authenticated!"})
//         }
//     })
// }

// // ------ verify and create middleware for WSSC Admin as well  ------
// export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
//     console.log('this is verifyAdmin section')
//     verifyCitizenToken(req, res, next, () => {
//         console.log(req.citizen)
//         if (req.citizen.isAdmin) {
//             next();
//         }
//         else
//             return res.status(403).json({ status: 403, message: "Sorry, You are not authorized" })
//     });
// }
