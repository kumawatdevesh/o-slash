import express, { Router } from 'express';
import {login, logout, register} from '../controllers/auth';
import {loginValidator, registerValidator} from '../validators/auth';
import {verifyToken, authenticateUser} from '../middlewares/auth'

const router:Router = express.Router();

router.post('/login', loginValidator, login);

router.post('/register', registerValidator, register);

router.post('/logout', verifyToken, authenticateUser, logout);

export {
    router
}