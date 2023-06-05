"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Complaint_controller_1 = require("../controller/Complaint.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const ComplaintRouter = (0, express_1.Router)();
ComplaintRouter.route("/:id")
    .get(verifyToken_1.verifyUser, Complaint_controller_1.GetAllComplaints)
    .get(Complaint_controller_1.GetComplaint)
    .patch(Complaint_controller_1.CitizenFeedback)
    .patch(verifyToken_1.verifyAdmin, Complaint_controller_1.UpdateComplaint)
    .post(verifyToken_1.verifyUser, Complaint_controller_1.CreateComplaint)
    .delete(verifyToken_1.verifyAdmin, Complaint_controller_1.DeleteAllcomplaints);
ComplaintRouter;
exports.default = ComplaintRouter;
//# sourceMappingURL=Complaint.route.js.map