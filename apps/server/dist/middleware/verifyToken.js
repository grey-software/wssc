"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HandleError_1 = require("../HandleError");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// eslint-disable-next-line turbo/no-undeclared-env-vars
const JWT = process.env.JWT_KEY;
// ----- verify citizen token -------------
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.access_token;
    if (!token)
        return next((0, HandleError_1.createError)(401, "You are not authenticated!"));
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, JWT, (err, payload) => {
            if (err)
                return reject((0, HandleError_1.createError)(403, "Token is not valid!"));
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
});
exports.verifyToken = verifyToken;
// ----- verifyUser before making any request --------
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.verifyToken)(req, res, next);
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            return res
                .status(403)
                .json({ status: 403, message: "You are not authorized!" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.verifyUser = verifyUser;
// ------ verify and create middleware for WSSC Admin as well  ------
const verifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.verifyToken)(req, res, next);
        if (req.user.isAdmin) {
            next();
        }
        else {
            return res
                .status(403)
                .json({ status: 403, message: "Sorry, You are not authorized" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.verifyAdmin = verifyAdmin;
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
//# sourceMappingURL=verifyToken.js.map