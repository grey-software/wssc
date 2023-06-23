"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: [true, "please provide your organization name"]
    },
    shortname: {
        type: String,
        required: [true, "please provide short name"]
    },
    logo: {
        type: String,
        requird: [true, "provide logo link here"]
    },
    WSSC_CODE: {
        type: String,
        required: [true, "please validate your organization code"],
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    }
}, { timestamps: true });
exports.AdminsModel = mongoose_1.default.models.WSSC ||
    mongoose_1.default.model("WSSC", AdminSchema);
//# sourceMappingURL=WsscsAdmin.schema.js.map