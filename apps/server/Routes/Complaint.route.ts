import { Router } from "express";
import {
  CreateComplaint,
  GetComplaint,
  GetAllComplaints,
  DeleteAllcomplaints,
  CitizenFeedback,
  AddStatement,
  SupervisorResponse,
  GetSupervisorComplaints,
  AssignComplaint,
} from "../controller/Complaint.controller";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken";

const ComplaintRouter: Router = Router();

ComplaintRouter.route("/").get(verifyToken, GetAllComplaints);

ComplaintRouter.route("/:id")
  .get(verifyToken, GetComplaint)
  .patch(verifyToken, AddStatement)
  .delete(verifyAdmin, DeleteAllcomplaints);

ComplaintRouter.post("/", verifyToken, CreateComplaint);
ComplaintRouter.patch("/feedback/:id", verifyToken, CitizenFeedback);
ComplaintRouter.patch("/response/:id", verifyToken, SupervisorResponse);

ComplaintRouter.get("/supervisor/:id", verifyToken, GetSupervisorComplaints);

// ASSIGN COMPLAINT ROUTE
ComplaintRouter.route("/:supervisorId/:complaintId").patch(
  // verifyToken,
  AssignComplaint
);

ComplaintRouter;

export default ComplaintRouter;
