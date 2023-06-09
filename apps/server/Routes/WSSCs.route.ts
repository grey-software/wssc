import express, { Router } from 'express';
import { AdminLogout, AllRecords, Register, SignIn,  } from '../controller/WSSCS.controller';
import { verifyAdmin } from '../middleware/verifyToken';

const WSSC: Router = express.Router();

WSSC.post('/signup', Register);
WSSC.post('/signin', SignIn);
WSSC.get('/logout', AdminLogout)
WSSC.get('/statistics', verifyAdmin, AllRecords)

// WSSC.get("/testing", async (req, res, next) => {
//     res.send("its working fine correctly")
// })



export default WSSC