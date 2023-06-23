"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.citizenModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const citizenSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Citizen must have a name"],
    },
    phone: {
        type: Number,
        required: [true, "Citizen must have a phone number"],
        index: true,
        unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    email: {
        type: String,
        validate: [validator_1.default.isEmail, "Please provide a valid email"],
    },
    WSSC_CODE: { type: String, required: [true, "WSSC code is required"] },
    address: { type: String },
    profile_image: { type: String },
}, { timestamps: true });
exports.citizenModel = mongoose_1.default.model("citizens", citizenSchema);
//# sourceMappingURL=citizen.schema.js.map