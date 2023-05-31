import mongoose, { mongo } from "mongoose";
import { WSSC_TYPES } from "../@types/WSSC'sSchema.type";


const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide your organization name"]
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
},
    { timestamps: true }
);

export const AdminsModel =
    mongoose.models.WSSC ||
    mongoose.model<WSSC_TYPES>("WSSC", AdminSchema);