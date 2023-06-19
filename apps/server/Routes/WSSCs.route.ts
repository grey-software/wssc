import express, { Router } from 'express';
import { AdminLogout, Statistics, Register, SignIn, UpdateAllComplaints, SupervisorUsersShifting,  } from '../controller/WSSCS.controller';
import { verifyAdmin } from '../middleware/verifyToken';

const WSSC: Router = express.Router();

WSSC.post('/signup', Register);
WSSC.post('/signin', SignIn);
WSSC.get('/logout', AdminLogout)
WSSC.get('/statistics', verifyAdmin, Statistics);
WSSC.patch('/update-complaints', verifyAdmin, UpdateAllComplaints);
WSSC.patch('/update-users-supervisors', verifyAdmin, SupervisorUsersShifting);




export default WSSC