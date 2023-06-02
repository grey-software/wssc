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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAllcomplaints = exports.GetAllComplaints = exports.UpdateComplaint = exports.GetComplaint = exports.CreateComplaint = void 0;
const complaint_schema_1 = require("../Models/complaint.schema");
const Complaint_Validation_1 = require("../Schema_validation/Complaint_Validation");
const node_1 = require("@novu/node");
// create complaint method definition
const CreateComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // first we need to validate the data before saving it in DB
    const { error } = (0, Complaint_Validation_1.ComplaintValidation)(req.body);
    // below statement will call if there is invalid data recieved in req.body
    if (error)
        return res.send(error.details[0].message);
    const userId = req.params.id;
    const citizenId = req.user.id;
    if (userId == citizenId) {
        try {
            const CreateComplaint = new complaint_schema_1.ComplaintModel(req.body);
            yield CreateComplaint.save();
            res.status(200).json({ status: 200, success: true, CreateComplaint });
        }
        catch (error) {
            res.status(404).json({ status: 404, success: false, message: error });
        }
    }
    else
        res.status(303).json({
            status: 303,
            success: false,
            message: "You are not authenticated",
        });
});
exports.CreateComplaint = CreateComplaint;
// Get a single complaint
const GetComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const complaintId = req.params.id;
    try {
        const complaint = yield complaint_schema_1.ComplaintModel.findById({
            _id: complaintId,
        });
        res.status(200).json({
            status: 200,
            success: true,
            complaint,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            success: false,
            message: error,
        });
    }
});
exports.GetComplaint = GetComplaint;
const UpdateComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const complaintId = req.params.id;
    try {
        // To check if the current user is admin, Only admin can update the complaint
        if (req.user.isAdmin) {
            const complaint = yield complaint_schema_1.ComplaintModel.findById(complaintId);
            let status;
            let statusLength = complaint === null || complaint === void 0 ? void 0 : complaint.status.length;
            console.log(statusLength);
            // pushing the next status based on the previous status
            if (statusLength == 1) {
                status = {
                    state: "InProgress",
                    updateAt: new Date().toLocaleDateString(),
                };
            }
            else if (statusLength == 2) {
                status = {
                    state: "Completed",
                    updateAt: new Date().toLocaleDateString(),
                };
            }
            else {
                status = { state: "Closed", updateAt: new Date().toLocaleDateString() };
            }
            const updated = yield complaint_schema_1.ComplaintModel.findByIdAndUpdate(complaintId, {
                $addToSet: { status: status },
            });
            // Sending Notification to user
            // eslint-disable-next-line turbo/no-undeclared-env-vars
            const novu = new node_1.Novu(`${process.env.NOVU_KEY}`);
            const response = yield novu.trigger("complaint-status-updated", {
                to: {
                    subscriberId: `${complaint === null || complaint === void 0 ? void 0 : complaint.userId}`,
                },
                payload: {
                    // for now only this string will go to frontend, will modify it once we have connected frontend and backend
                    status: "Complaint Updated",
                },
            });
            res.status(200).json({
                status: 200,
                success: true,
                message: "Status updated successfully",
                data: response.data,
            });
        }
        else {
            res.status(303).json({
                status: 303,
                success: false,
                message: "You are not authorized to update complaint",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.UpdateComplaint = UpdateComplaint;
// Get All complaints
const GetAllComplaints = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    console.log(req.user.id == req.params.id);
    let allComplaints;
    try {
        if (req.user.isAdmin) {
            allComplaints = yield complaint_schema_1.ComplaintModel.find().sort({ _id: -1 });
        }
        else {
            allComplaints = yield complaint_schema_1.ComplaintModel.find({ userId: userId }).sort({
                _id: -1,
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            TotalComplaints: allComplaints.length,
            allComplaints,
        });
    }
    catch (error) {
        res.status(404).json({ status: 404, success: false, message: error });
    }
});
exports.GetAllComplaints = GetAllComplaints;
// delete all complaints
const DeleteAllcomplaints = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const LoggedId = req.user.id;
    const userId = req.params.id;
    if (LoggedId == userId) {
        try {
            yield complaint_schema_1.ComplaintModel.deleteMany({ userId });
            res.status(200).json({
                status: 200,
                success: true,
                message: "All complaints deleted successfully",
            });
        }
        catch (error) {
            res.status(404).json({ status: 404, success: false, message: error });
        }
    }
    else {
        res.status(401).json({
            status: 401,
            success: false,
            message: "You are not authorized to delete complaints",
        });
    }
});
exports.DeleteAllcomplaints = DeleteAllcomplaints;
//# sourceMappingURL=Complaint.controller.js.map