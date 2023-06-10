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
  SupervisorResponse,
} from "../controller/Complaint.controller";
import { verifyAdmin, verifyToken } from "../middleware/verifyToken";

const ComplaintRouter: Router = Router();

ComplaintRouter.route("/").get(verifyToken, GetAllComplaints);

ComplaintRouter.route("/:id")
  .get(verifyToken, GetComplaint)
  .patch(verifyToken, AddStatement)
  .delete(verifyAdmin, DeleteAllcomplaints);

ComplaintRouter.post("/", verifyToken, CreateComplaint)
ComplaintRouter.patch("/feedback/:id", verifyToken, CitizenFeedback);
ComplaintRouter.patch("/response/:id", verifyToken, SupervisorResponse);

ComplaintRouter.get("/supervisor", verifyToken, GetSupervisorComplaints);

// ASSIGN COMPLAINT ROUTE
ComplaintRouter.route("/:supervisorId/:complaintId").patch(
  // verifyToken,
  AssignComplaint
);

ComplaintRouter;

export default ComplaintRouter;
