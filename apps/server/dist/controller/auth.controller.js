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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.SignIn = exports.SignUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const citizen_schema_1 = require("../Models/citizen.schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_Validation_1 = require("../Schema_validation/Auth_Validation");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY = process.env.JWT_KEY;
const SignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // first we need to validate the data before saving it in DB
    const { error } = (0, Auth_Validation_1.SignUp_validate)(req.body);
    // below statement will call if there is data not valid
    if (error)
        return res.send(error.details[0].message);
    const { name, phone, password } = req.body;
    // encrypt password by using bcrypt algorithm
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    try {
        const verify = yield citizen_schema_1.citizenModel.findOne({ phone });
        //checking duplicate phone number
        if (!verify) {
            const createUser = new citizen_schema_1.citizenModel({
                name: name,
                phone: phone,
                password: hash,
            });
            yield createUser.save();
            res.status(200).json(createUser);
        }
        else {
            res.status(400).send("This phone number has already registered!");
        }
    }
    catch (err) {
        // next(err);
        return res.status(500).json({
            status: 500,
            success: false,
            message: err,
        });
    }
});
exports.SignUp = SignUp;
// ----- sign in -----
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // first we need to validate the data before saving it in DB
    const { error } = (0, Auth_Validation_1.SignIn_validate)(req.body);
    if (error)
        return res.send(error.details[0].message);
    try {
        const User = yield citizen_schema_1.citizenModel.findOne({ phone: req.body.phone });
        if (!User)
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User is not found!",
            });
        //   now checking password
        const isCorrect = yield bcryptjs_1.default.compare(req.body.password, User.password);
        // if the password is wrong.
        if (!isCorrect)
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password is incorrect",
            });
        // if the user credential is okay then we assign/send jwt token for authentication and authorization
        const token = jsonwebtoken_1.default.sign({ id: User._id, name: User.name, phone: User.phone }, SECRET_KEY);
        const _a = User._doc, { password } = _a, detail = __rest(_a, ["password"]);
        res
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(detail);
    }
    catch (error) {
        next(error);
    }
});
exports.SignIn = SignIn;
// In case of logout, we remove or deleted jwt token from user machine.
const Logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error,
        });
    }
});
exports.Logout = Logout;
//# sourceMappingURL=auth.controller.js.map