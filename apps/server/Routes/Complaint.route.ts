import { Router } from "express";
import {
  CreateComplaint,
  GetComplaint,
  UpdateComplaint,
  GetAllComplaints,
  DeleteAllcomplaints,
} from "../controller/Complaint.controller";
import { verifyAdmin, verifyUser } from "../middleware/verifyToken";

const ComplaintRouter: Router = Router();

ComplaintRouter.route("/:id")
  .get(verifyUser, GetAllComplaints)
  .get(GetComplaint)
  .patch(verifyAdmin, UpdateComplaint)
  .post(verifyUser, CreateComplaint)
  .delete(verifyAdmin, DeleteAllcomplaints);

ComplaintRouter;

export default ComplaintRouter;
