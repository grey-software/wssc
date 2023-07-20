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
exports.Logout = exports.GetAllSupervisors = exports.DeleteSupervisor = exports.UpdateSupervisor = exports.GetSupervisor = exports.SignInSupervisor = exports.RegisterSupervisor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supervisor_schema_1 = require("../Models/supervisor.schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const WsscsAdmin_schema_1 = require("../Models/WsscsAdmin.schema");
// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY = process.env.JWT_KEY;
// REGESTER SUPERVISOR CONTROLLER
const RegisterSupervisor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const WSSC_CODE = req.user.WSSC_CODE;
    const { name, phone, password } = req.body;
    // ENCRYPTING PASSWORD
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    try {
        const verifySupervisor = yield supervisor_schema_1.SupervisorModel.findOne({ phone });
        if (!verifySupervisor) {
            const register = new supervisor_schema_1.SupervisorModel({
                name: name,
                phone: phone,
                WSSC_CODE: WSSC_CODE,
                password: hash,
            });
            yield register.save();
            const _a = register._doc, { password } = _a, detail = __rest(_a, ["password"]);
            res.status(200).json(detail);
        }
        else {
            res.status(400).json({
                status: 400,
                success: false,
                message: "This phone number is already registered!",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error,
        });
    }
});
exports.RegisterSupervisor = RegisterSupervisor;
// SIGN IN SUPERVISOR CONTROLLER
const SignInSupervisor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    console.log(req.body);
    try {
        const verifySupervisor = yield supervisor_schema_1.SupervisorModel.findOne({ phone });
        // CHECKING IF THE SUPERVISOR EXISTS
        if (!verifySupervisor) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "User is not found!",
            });
        }
        const verifyPassword = yield bcryptjs_1.default.compare(req.body.password, verifySupervisor.password);
        // CHECKING IF THE PASSWORD IS CORRECT
        if (!verifyPassword)
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password is incorrect",
            });
        // Getting WSSC data which is associated with citizen
        const WSSC = yield WsscsAdmin_schema_1.AdminsModel.findOne({ WSSC_CODE: verifySupervisor === null || verifySupervisor === void 0 ? void 0 : verifySupervisor.WSSC_CODE });
        const WSSC_DATA = {
            fullname: WSSC.fullname,
            shortname: WSSC.shortname,
            logo: WSSC.logo
        };
        const supervisorToken = jsonwebtoken_1.default.sign({
            id: verifySupervisor._id,
            isSupervisor: true,
            WSSC_CODE: verifySupervisor.WSSC_CODE,
        }, SECRET_KEY);
        const _b = verifySupervisor._doc, { password } = _b, supervisor = __rest(_b, ["password"]);
        // res
        //   .cookie("access_token", supervisorToken, {
        //     httpOnly: true,
        //   })
        res.status(200)
            .json({ success: true, status: 200, supervisor: supervisor, WSSC: WSSC_DATA, supervisorToken });
    }
    catch (error) {
        next(error);
    }
});
exports.SignInSupervisor = SignInSupervisor;
// GET SINGLE SUPERVISOR
const GetSupervisor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const supervisor = yield supervisor_schema_1.SupervisorModel.findById(userId);
        res.status(200).json({
            status: 200,
            success: true,
            data: supervisor,
        });
    }
    catch (error) {
        res.status(404).json({ status: 404, success: false, message: error });
    }
});
exports.GetSupervisor = GetSupervisor;
// UPDATE SUPERVISOR INFO CONTROLLER
const UpdateSupervisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const supervisorId = req.params.id;
    console.log(supervisorId);
    console.log(req.body);
    try {
        const supervisor = yield supervisor_schema_1.SupervisorModel.findByIdAndUpdate(supervisorId, req.body, { new: true });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Supervisor info Updated Successfully",
            data: supervisor,
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
exports.UpdateSupervisor = UpdateSupervisor;
// DELETING SUPERVISOR
const DeleteSupervisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const supervisorId = req.params.id;
    try {
        yield supervisor_schema_1.SupervisorModel.findByIdAndUpdate(supervisorId, {
            $set: { isDeleted: true },
        });
        res.status(200)
            .json({
            status: 200,
            success: true,
            message: "Supervisor Deleted Successfully",
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
exports.DeleteSupervisor = DeleteSupervisor;
// GET ALL SUPERVISORS
const GetAllSupervisors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSupervisors = yield supervisor_schema_1.SupervisorModel.find({
            WSSC_CODE: req.user.WSSC_CODE,
            isDeleted: false,
        }).sort({ updatedAt: -1 });
        res.status(200).json({
            status: 200,
            success: true,
            Results: allSupervisors.length,
            data: allSupervisors,
        });
    }
    catch (error) {
        res.status(404).json({ status: 404, success: false, message: error });
    }
});
exports.GetAllSupervisors = GetAllSupervisors;
// In case of logout, we remove or deleted jwt token from user machine.
const Logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inside try section");
        res.status(200)
            .json({
            status: 200,
            success: true,
            message: "Supervisor Signed Out Successfully",
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
//# sourceMappingURL=supervisor.controller.js.map