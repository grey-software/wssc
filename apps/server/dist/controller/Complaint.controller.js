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
exports.SupervisorResponse = exports.CitizenFeedback = exports.DeleteAllcomplaints = exports.GetSupervisorComplaints = exports.GetAllComplaints = exports.UpdateComplaint = exports.AssignComplaint = exports.AddStatement = exports.GetComplaint = exports.CreateComplaint = void 0;
const complaint_schema_1 = require("../Models/complaint.schema");
const Complaint_Validation_1 = require("../Schema_validation/Complaint_Validation");
const node_1 = require("@novu/node");
// eslint-disable-next-line turbo/no-undeclared-env-vars
const novu = new node_1.Novu(`${process.env.NOVU_KEY}`);
// create complaint method definition
const CreateComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // first we need to validate the data before saving it in DB
    const { error } = (0, Complaint_Validation_1.ComplaintValidation)(req.body);
    // below statement will call if there is invalid data recieved in req.body
    if (error)
        return res.send(error.details[0].message);
    const userId = req.body.userId;
    const citizenId = req.user.id;
    console.log(userId == citizenId);
    if (userId == citizenId) {
        try {
            const CreateComplaint = new complaint_schema_1.ComplaintModel(req.body);
            yield CreateComplaint.save();
            // SENDING NOTIFICATION TO ADMING
            yield novu.trigger("complaint-status-updated", {
                to: {
                    subscriberId: `wsscp25001`,
                },
                payload: {
                    id: CreateComplaint === null || CreateComplaint === void 0 ? void 0 : CreateComplaint._id,
                    message: "A New Complaint is filed, Refresh Complaint page to show",
                },
            });
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
// ADD STATEMENT TO COMPLAINT
const AddStatement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const complaintId = req.params.id;
    const statement = req.body.wsscStatement;
    try {
        const updated = yield complaint_schema_1.ComplaintModel.findByIdAndUpdate(complaintId, {
            $set: { wsscStatement: statement },
        }, { new: true });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Statement added successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.AddStatement = AddStatement;
// ASSIGN COMPLAINT TO SUPERVISOR
const AssignComplaint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supervisorId = req.params.supervisorId;
        const complaintId = req.params.complaintId;
        const assigned = yield complaint_schema_1.ComplaintModel.findByIdAndUpdate(complaintId, {
            $set: { supervisorId: supervisorId },
        }, { new: true });
        //  CHANGE THE STATUS TO INPROGRESS
        let status = {
            state: "InProgress",
            updateAt: new Date().toLocaleDateString(),
        };
        yield complaint_schema_1.ComplaintModel.findByIdAndUpdate(complaintId, {
            $addToSet: { status: status },
        });
        yield novu.trigger("complaint-status-updated", {
            to: {
                subscriberId: assigned === null || assigned === void 0 ? void 0 : assigned.userId,
            },
            payload: {
                id: complaintId,
                message: "Your Complaint is being processed",
            },
        });
        yield novu.trigger("complaint-status-updated", {
            to: {
                subscriberId: assigned.supervisorId,
            },
            payload: {
                id: complaintId,
                message: "A New Complaint is Assigned to You, Refresh Complaints page to see",
            },
        });
        res.status(200).json({
            status: 200,
            success: true,
            message: "Status updated successfully",
            data: assigned.data,
        });
        // res.status(200).json({
        //   status: 200,
        //   success: true,
        //   message: "Complaint assigned successfully",
        //   data: assigned,
        // });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            success: false,
            message: error.message,
        });
    }
});
exports.AssignComplaint = AssignComplaint;
const UpdateComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const complaintId = req.params.id;
    try {
        // To check if the current user is admin, Only admin can update the complaint
        if (req.user.isAdmin) {
            const complaint = yield complaint_schema_1.ComplaintModel.findById(complaintId);
            let status;
            let statusLength = complaint === null || complaint === void 0 ? void 0 : complaint.status.length;
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
            const response = yield novu.trigger("complaint-status-updated", {
                to: {
                    subscriberId: complaint === null || complaint === void 0 ? void 0 : complaint.userId,
                },
                payload: {
                    // for now only this string will go to frontend, will modify it once we have connected frontend and backend
                    status: "Complaint Status updated Updated",
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
    try {
        let allComplaints;
        let query = {}; // query variable is used to store the userType and will fetch all complaints according to the logged User
        if (req.user.isAdmin)
            query = { WSSC_CODE: req.user.WSSC_CODE };
        else if (req.user.isSupervisor)
            query = { supervisorId: userId };
        else
            query = { userId: userId };
        allComplaints = yield complaint_schema_1.ComplaintModel.find(query).sort({ updatedAt: -1 });
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
// GET ALL COMPLAINT FOR SPECIFIC SUPERVISOR
const GetSupervisorComplaints = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the supervisor id from params
    const supervisorId = req.params.id;
    try {
        // get only those complaint in which supervisorId is equal to sent id
        const allComplaints = yield complaint_schema_1.ComplaintModel.find({
            supervisorId: supervisorId,
        }).sort({
            _id: -1,
        });
        // send response
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
exports.GetSupervisorComplaints = GetSupervisorComplaints;
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
// CITIZEN FEEDBACK
const CitizenFeedback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const LoggedId = req.user.id;
    const complaintId = req.params.id;
    const { rating, description } = req.body;
    let feedback = {
        rating: rating,
        description: description,
    };
    try {
        const complaint = yield complaint_schema_1.ComplaintModel.findById(complaintId);
        if (complaint.userId == LoggedId) {
            const updated = yield complaint_schema_1.ComplaintModel.findByIdAndUpdate(complaintId, { $set: { feedback } }, { new: true });
            console.log(updated);
            let status = {
                state: "Closed",
                updateAt: new Date().toLocaleDateString(),
            };
            yield complaint_schema_1.ComplaintModel.findByIdAndUpdate(complaintId, {
                $addToSet: { status: status },
            });
            // SENDING NOTIFICAITON TO CITIZEN
            yield novu.trigger("complaint-status-updated", {
                to: {
                    subscriberId: updated.userId,
                },
                payload: {
                    id: complaintId,
                    message: "Your Complaint is Closed",
                },
            });
            yield novu.trigger("complaint-status-updated", {
                to: {
                    subscriberId: updated.supervisorId,
                },
                payload: {
                    id: complaintId,
                    message: "Your complaint Assign to you is now closed 🎉",
                },
            });
            yield novu.trigger("complaint-status-updated", {
                to: {
                    subscriberId: "wsscp25001",
                },
                payload: {
                    id: complaintId,
                    message: "A citizen provided Feedback on complaint, Visit Feedbacks to see",
                },
            });
            res.status(200).json({
                status: 200,
                success: true,
                message: "Feedback Provided successfully",
                data: updated,
            });
        }
        else {
            res.status(401).json({
                status: 401,
                success: false,
                message: "You are not authorized to provide feedback on this complaint",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ status: 404, success: false, message: error });
    }
});
exports.CitizenFeedback = CitizenFeedback;
// SUPERVISOR RESPONSE
const SupervisorResponse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const LoggedId = req.user.id;
    const complaintId = req.params.id;
    try {
        const complaint = yield complaint_schema_1.ComplaintModel.findById(complaintId);
        if (complaint.supervisorId == LoggedId) {
            const responded = yield complaint_schema_1.ComplaintModel.findByIdAndUpdate(complaintId, { $set: { response: req.body } }, { new: true });
            let status = {
                state: "Completed",
                updateAt: new Date().toLocaleDateString(),
            };
            yield complaint_schema_1.ComplaintModel.findByIdAndUpdate(complaintId, {
                $addToSet: { status: status },
            });
            // SENDING NOTIFICATION TO CITIZEN
            yield novu.trigger("complaint-status-updated", {
                to: {
                    subscriberId: responded.userId,
                },
                payload: {
                    id: complaintId,
                    message: "Your complaint is Resolved, Please give your Feedback",
                },
            });
            res.status(200).json({
                status: 200,
                success: true,
                message: "Response Provided successfully",
                data: responded,
            });
            // next();
        }
        else {
            res.status(401).json({
                status: 401,
                success: false,
                message: "You are not authorized to provide response to this complaint",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ status: 404, success: false, message: error });
    }
});
exports.SupervisorResponse = SupervisorResponse;
//# sourceMappingURL=Complaint.controller.js.map