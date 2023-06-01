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
exports.AdminLogout = exports.SignIn = exports.Register = void 0;
const WsscsAdmin_schema_1 = require("../Models/WsscsAdmin.schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY = process.env.JWT_KEY;
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, WSSC_CODE, password, isAdmin } = req.body;
    // checking whether there is same wssc organization registered or not
    // encrypt password by using bcrypt algorithm
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hashPassword = bcryptjs_1.default.hashSync(password, salt);
    console.log(hashPassword);
    try {
        const admin = yield WsscsAdmin_schema_1.AdminsModel.findOne({ WSSC_CODE: req.body.WSSC_CODE });
        console.log(admin);
        if (!admin) {
            const RegisterWSSC = new WsscsAdmin_schema_1.AdminsModel({ name: name, WSSC_CODE: WSSC_CODE, isAdmin: isAdmin, password: hashPassword });
            yield RegisterWSSC.save();
            const _a = RegisterWSSC._doc, { password } = _a, detail = __rest(_a, ["password"]);
            res.status(200).json(Object.assign({ success: true, status: 200 }, detail));
        }
        else {
            res.status(403).json({ success: false, status: 403, message: "this organization has already registered!" });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, status: 500, error });
    }
});
exports.Register = Register;
// SignIn controller
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { WSSC_Code, password } = req.body;
    console.log(req.body);
    // first we need to validate the data before saving it in DB
    // const { error } = SignIn_validate(req.body);
    // if (error) return res.send(error.details[0].message);
    try {
        const admin = yield WsscsAdmin_schema_1.AdminsModel.findOne({ WSSC_CODE: req.body.WSSC_CODE });
        if (!admin)
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Wrong Credentials",
            });
        // Now checking password
        const isCorrect = yield bcryptjs_1.default.compare(req.body.password, admin.password);
        // if the password is wrong.
        if (!isCorrect)
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password is incorrect",
            });
        // if the user credential is okay then we assign/send jwt token for authentication and authorization
        const token = jsonwebtoken_1.default.sign({ id: admin._id, name: admin.name, isAdmin: admin.isAdmin, orgCode: admin.WSSC_CODE }, SECRET_KEY);
        const _b = admin._doc, { password } = _b, detail = __rest(_b, ["password"]);
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(detail);
    }
    catch (error) {
        res.status(500).json({ success: false, status: 500, errorMessage: error });
    }
});
exports.SignIn = SignIn;
// In case of logout, we remove or deleted jwt token.
const AdminLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: error,
        });
    }
});
exports.AdminLogout = AdminLogout;
//# sourceMappingURL=WSSCS.controller.js.map