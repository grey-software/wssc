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
import { verifyAdmin, verifyToken } from "../middleware/verifyToken";

const ComplaintRouter: Router = Router();

ComplaintRouter.route("/:id")
  .get(verifyToken,GetComplaint)
  .patch(verifyToken, UpdateComplaint)
  .post(verifyToken, CreateComplaint)
  .delete(verifyAdmin, DeleteAllcomplaints);

ComplaintRouter.patch("/feedback/:id", verifyToken, CitizenFeedback)
ComplaintRouter.get("/", verifyToken, GetAllComplaints);

// ASSIGN COMPLAINT ROUTE
ComplaintRouter.route("/:supervisorId/:complaintId").patch(AssignComplaint);

ComplaintRouter;

export default ComplaintRouter;
