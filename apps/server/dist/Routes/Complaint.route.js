"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Complaint_controller_1 = require("../controller/Complaint.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const ComplaintRouter = (0, express_1.Router)();
ComplaintRouter.route("/").get(verifyToken_1.verifyToken, Complaint_controller_1.GetAllComplaints);
ComplaintRouter.route("/:id")
    .get(verifyToken_1.verifyToken, Complaint_controller_1.GetComplaint)
    .patch(verifyToken_1.verifyToken, Complaint_controller_1.AddStatement)
    .delete(verifyToken_1.verifyAdmin, Complaint_controller_1.DeleteAllcomplaints);
ComplaintRouter.post("/", verifyToken_1.verifyToken, Complaint_controller_1.CreateComplaint);
ComplaintRouter.patch("/feedback/:id", verifyToken_1.verifyToken, Complaint_controller_1.CitizenFeedback);
ComplaintRouter.patch("/response/:id", verifyToken_1.verifyToken, Complaint_controller_1.SupervisorResponse);
ComplaintRouter.get("/supervisor/:id", verifyToken_1.verifyToken, Complaint_controller_1.GetSupervisorComplaints);
// ASSIGN COMPLAINT ROUTE
ComplaintRouter.route("/:supervisorId/:complaintId").patch(
// verifyToken,
Complaint_controller_1.AssignComplaint);
ComplaintRouter;
exports.default = ComplaintRouter;
//# sourceMappingURL=Complaint.route.js.map