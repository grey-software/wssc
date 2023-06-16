import express, { Router } from 'express';
import { AdminLogout, Statistics, Register, SignIn,  } from '../controller/WSSCS.controller';
import { verifyAdmin } from '../middleware/verifyToken';

const WSSC: Router = express.Router();

WSSC.post('/signup', Register);
WSSC.post('/signin', SignIn);
WSSC.get('/logout', AdminLogout)
WSSC.get('/statistics', verifyAdmin, Statistics)




export default WSSC