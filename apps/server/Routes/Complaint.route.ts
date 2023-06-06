import { Router } from "express";
import {
  CreateComplaint,
  GetComplaint,
  UpdateComplaint,
  GetAllComplaints,
  DeleteAllcomplaints,
  CitizenFeedback,
  AssignComplaint,
  GetSupervisorComplaints,
  AddStatement,
} from "../controller/Complaint.controller";
import { verifyAdmin, verifyToken } from "../middleware/verifyToken";

const ComplaintRouter: Router = Router();

ComplaintRouter.route("/").get(verifyToken, GetAllComplaints);

ComplaintRouter.route("/:id")
  .get(verifyToken, GetComplaint)
  .patch(verifyToken, AddStatement)
  .post(verifyToken, CreateComplaint)
  .delete(verifyAdmin, DeleteAllcomplaints);

ComplaintRouter.patch("/feedback/:id", verifyToken, CitizenFeedback);

ComplaintRouter.get("/supervisor", verifyToken, GetSupervisorComplaints);

// ASSIGN COMPLAINT ROUTE
ComplaintRouter.route("/:supervisorId/:complaintId").patch(
  // verifyToken,
  AssignComplaint
);

ComplaintRouter;

export default ComplaintRouter;
