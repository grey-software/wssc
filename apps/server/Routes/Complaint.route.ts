import { Router } from "express";
import {
  CreateComplaint,
  GetComplaint,
  UpdateComplaint,
  GetAllComplaints,
  DeleteAllcomplaints,
  CitizenFeedback,
  AssignComplaint,
} from "../controller/Complaint.controller";
import { verifyAdmin, verifyUser } from "../middleware/verifyToken";

const ComplaintRouter: Router = Router();

ComplaintRouter.route("/:id")
  .get(verifyUser, GetAllComplaints)
  .get(GetComplaint)
  .patch(CitizenFeedback)
  .patch(verifyAdmin, UpdateComplaint)
  .post(verifyUser, CreateComplaint)
  .delete(verifyAdmin, DeleteAllcomplaints);

// ComplaintRouter.get("/", GetAllComplaints);
// ASSIGN COMPLAINT ROUTE
ComplaintRouter.route("/:supervisorId/:complaintId").patch(AssignComplaint);

ComplaintRouter;

export default ComplaintRouter;
