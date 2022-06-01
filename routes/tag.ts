import express, { Router } from 'express';
import { tagValidator } from '../validators/tag';
import {createTag} from '../controllers/tag'
import { authenticateUser, verifyToken } from '../middlewares/auth';

const router:Router = express.Router();

router.post('/tag', tagValidator, verifyToken, authenticateUser, createTag);

export {
    router
}