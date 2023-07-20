"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySupervisor = exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HandleError_1 = require("../HandleError");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// eslint-disable-next-line turbo/no-undeclared-env-vars
const JWT = process.env.JWT_KEY;
// ----- verify citizen token -------------
const verifyToken = (req, res, next) => {
    // const token: any = req.cookies.access_token;
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
        return next((0, HandleError_1.createError)(401, "You are not authenticated!"));
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT);
        req.user = payload;
        next();
    }
    catch (err) {
        next((0, HandleError_1.createError)(403, "Token is not valid!"));
    }
};
exports.verifyToken = verifyToken;
// ----- verifyUser before making any request --------
const verifyUser = (req, res, next) => {
    try {
        (0, exports.verifyToken)(req, res, () => {
            if (req.user.id == req.params.id || req.user.isAdmin) {
                next();
            }
            else {
                return res
                    .status(403)
                    .json({ status: 403, message: "You are not authorized!" });
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyUser = verifyUser;
// ------ verify and create middleware for WSSC Admin as well  ------
const verifyAdmin = (req, res, next) => {
    try {
        (0, exports.verifyToken)(req, res, () => {
            if (req.user.isAdmin) {
                next();
            }
            else {
                return res
                    .status(403)
                    .json({ status: 403, message: "Sorry, You are not authorized" });
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyAdmin = verifyAdmin;
// ------ verify and create middleware for WSSC Admin as well  ------
const verifySupervisor = (req, res, next) => {
    try {
        (0, exports.verifyToken)(req, res, () => {
            if (req.user.isSupervisor || req.user.isAdmin) {
                next();
            }
            else {
                return res
                    .status(403)
                    .json({ status: 403, message: "Sorry, You are not authorized" });
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifySupervisor = verifySupervisor;
//# sourceMappingURL=verifyToken.js.map