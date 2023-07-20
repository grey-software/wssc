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
exports.ChangePassword = exports.DeleteAccount = exports.RetreiveAllUsers = exports.GetUser = exports.UpdateUser = void 0;
const citizen_schema_1 = require("../Models/citizen.schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// update user info
const UpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const citizenId = req.user.id;
    console.log(req.body);
    if (userId == citizenId || req.user.isAdmin) {
        try {
            const updateInfo = yield citizen_schema_1.citizenModel.findByIdAndUpdate(userId, req.body, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                success: true,
                message: "Account Updated Successfully",
                updateInfo,
            });
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                success: false,
                message: error,
            });
        }
    }
    else {
        res.status(401).json({
            status: 401,
            success: false,
            message: "You are not authenticated to update this account",
        });
    }
});
exports.UpdateUser = UpdateUser;
// get a single user info
const GetUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const citizenId = req.user.id;
    if (userId == citizenId || req.user.isAdmin) {
        try {
            const user = yield citizen_schema_1.citizenModel.findById(req.params.id);
            const _a = user === null || user === void 0 ? void 0 : user._doc, { password } = _a, detail = __rest(_a, ["password"]);
            res.status(200).json(detail);
        }
        catch (err) {
            next(err);
        }
    }
    else
        return res.status(403).json({
            status: 403,
            success: false,
            message: "You are not authunticated to get this info",
        });
});
exports.GetUser = GetUser;
// RetreiveAllUsers Controller
const RetreiveAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Only Admin can retrieve all the users data
        const code = req.user.WSSC_CODE;
        const allUsers = yield citizen_schema_1.citizenModel
            .find({ WSSC_CODE: code })
            .sort({ updatedAt: -1 });
        res.status(200).json({
            status: 200,
            success: true,
            TotalUsers: allUsers.length,
            data: { allUsers },
        });
    }
    catch (error) {
        res.status(404).json({ status: 404, success: false, message: error });
    }
});
exports.RetreiveAllUsers = RetreiveAllUsers;
// In case of account deletion, we can delete complete record of the following users from DB as well as from his local machine.
const DeleteAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id; //getting user_Id through params/url
    const LoggedId = req.user.id; // getting user current logged id.
    // checking whether the logged_id and params_id are same or not, if not then request will denay because its wrong user
    if (userId == LoggedId || req.user.isAdmin) {
        try {
            const validiting = yield citizen_schema_1.citizenModel.find(req.body.userId);
            if (validiting) {
                // now deleting account
                yield citizen_schema_1.citizenModel.findByIdAndDelete(userId);
                // after deleting accound from DB, we need to clear cookie as well
                res
                    .clearCookie("access_token", {
                    sameSite: "none",
                })
                    .status(200)
                    .json({
                    status: 200,
                    success: true,
                    message: "Account Deleted Successfuly",
                });
            }
        }
        catch (error) {
            res.status(500).json({
                status: 500,
                success: false,
                message: error,
            });
        }
    }
    else
        return res.status(401).json({
            status: 401,
            success: false,
            message: "You are not authenticated to deleted this account",
        });
});
exports.DeleteAccount = DeleteAccount;
// change password controller
const ChangePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id; //getting user_Id through params/url
    const LoggedId = req.user.id; // getting user current logged id.
    // checking whether the logged_id and params_id are same or not, if not then request will denay because its wrong user
    if (userId == LoggedId) {
        // encrypt password by using bcrypt algorithm
        const salt = bcryptjs_1.default.genSaltSync(10);
        const HashedPassword = bcryptjs_1.default.hashSync(req.body.password, salt);
        try {
            yield citizen_schema_1.citizenModel.findByIdAndUpdate(userId, { password: HashedPassword }, {
                new: true,
            });
            res.status(200).json({
                status: 200,
                success: true,
                message: "Password changed successfully",
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                success: false,
                message: error,
            });
        }
    }
    else
        return res.status(401).json({
            status: 200,
            success: false,
            message: "You are not authenticated to change password",
        });
});
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=citizen.controller.js.map