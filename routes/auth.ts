import express, { Router } from 'express';
import {login, register} from '../controllers/auth';
import {loginValidator, registerValidator} from '../validators/auth'

const router:Router = express.Router();

router.post('/login', loginValidator, login);

router.post('/register', registerValidator, register);

export {
    router
}