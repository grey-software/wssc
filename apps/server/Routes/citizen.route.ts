import { Router } from "express";
import {
  UpdateUser,
  GetUser,
  RetreiveAllUsers,
  DeleteAccount,
  ChangePassword,
} from "../controller/citizen.controller";
import { verifyCitizenToken } from "../middleware/verifyToken";

const Citizen: Router = Router();

Citizen.route("/:id")
  .get(verifyCitizenToken, GetUser)
  .patch(verifyCitizenToken, UpdateUser)
  .delete(verifyCitizenToken, DeleteAccount);
Citizen.patch('/changepassword/:id', verifyCitizenToken, ChangePassword)
Citizen.get("/", RetreiveAllUsers);

export default Citizen;
