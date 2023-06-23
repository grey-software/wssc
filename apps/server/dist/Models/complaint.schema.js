"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ComplaintSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: [true, "CurrentUser_Id is required"] },
    supervisorId: {
        type: String,
        default: "",
    },
    userName: { type: String },
    phone: { type: String },
    complaintAddress: {
        type: String,
        required: [true, "Complaint address is required"],
    },
    complaintType: {
        type: String,
        required: [true, "Complaint type is mandatory one"],
    },
    complaintDes: { type: String },
    wsscStatement: { type: String },
    WSSC_CODE: { type: String, required: [true, "WSSC code is required"] },
    status: {
        type: [
            {
                state: { type: String },
                updatedAt: {
                    type: Date,
                    default: new Date(),
                },
                _id: false,
            },
        ],
        default: [{ state: "Initiated" }],
    },
    feedback: {
        type: {
            rating: {
                type: Number,
                required: [true, "Rating is required in feedback"],
            },
            description: String,
        },
    },
    response: {
        type: {
            ImageUrl: {
                type: String,
                // required: [true, "Image is required in responce"],
            },
            description: String,
        },
    },
    ImageUrl: { type: String },
    VideoUrl: { type: String },
}, { timestamps: true });
exports.ComplaintModel = mongoose_1.default.models.complaint ||
    mongoose_1.default.model("complaint", ComplaintSchema);
//# sourceMappingURL=complaint.schema.js.map