"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupervisorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SupervisorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Supervisor must have a name"],
    },
    WSSC_CODE: {
        type: String,
        required: [true, "please validate your organization code"],
    },
    phone: {
        type: String,
        required: [true, "Supervisor must have a phone number"],
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    isDeleted: { type: Boolean, default: false },
    profile_image: { type: String },
}, { timestamps: true });
exports.SupervisorModel = mongoose_1.default.models.Supervisors ||
    mongoose_1.default.model("supervisors", SupervisorSchema);
//# sourceMappingURL=supervisor.schema.js.map