import express, { Router } from 'express';
import { AdminLogout, Register, SignIn,  } from '../controller/WSSCS.controller';

const WSSC: Router = express.Router();

WSSC.post('/signup', Register);
WSSC.post('/signin', SignIn);
WSSC.get('/logout', AdminLogout)


export default WSSC