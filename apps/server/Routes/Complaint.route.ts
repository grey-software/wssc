import { Router } from "express";
import {
  CreateComplaint,
  GetComplaint,
  UpdateComplaint,
  GetAllComplaints,
} from "../controller/Complaint.controller";
import { verifyCitizenToken } from "../middleware/verifyToken";

const ComplaintRouter: Router = Router();

ComplaintRouter.get("/", verifyCitizenToken, GetAllComplaints);
ComplaintRouter.route("/:id")
  .get(verifyCitizenToken, GetComplaint)
  .patch(verifyCitizenToken, UpdateComplaint);

ComplaintRouter.post("/", verifyCitizenToken, CreateComplaint);

export default ComplaintRouter;
