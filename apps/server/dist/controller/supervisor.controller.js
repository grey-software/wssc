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
exports.GetAllSupervisors = exports.GetSupervisor = exports.SignInSupervisor = exports.RegisterSupervisor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supervisor_schema_1 = require("../Models/supervisor.schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// eslint-disable-next-line turbo/no-undeclared-env-vars
const SECRET_KEY = process.env.JWT_KEY;
// REGESTER SUPERVISOR
const RegisterSupervisor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, WSSC_CODE, phone, password } = req.body;
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
            res.status(200).json(register);
        }
        {
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
// SIGN IN SUPERVISOR
const SignInSupervisor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
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
        const verifyPassword = yield bcryptjs_1.default.compare(password, verifySupervisor.password);
        // CHECKING IF THE PASSWORD IS CORRECT
        if (!verifyPassword)
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password is incorrect",
            });
        const token = jsonwebtoken_1.default.sign({
            id: verifySupervisor._id,
            phone: verifySupervisor.phone,
            WSSC_CODE: verifySupervisor.WSSC_CODE,
        }, SECRET_KEY);
        const supervisor = verifySupervisor._doc;
        res
            .cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(supervisor);
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
// GET ALL SUPERVISORS
const GetAllSupervisors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSupervisors = yield supervisor_schema_1.SupervisorModel.find().sort({ _id: -1 });
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
//# sourceMappingURL=supervisor.controller.js.map