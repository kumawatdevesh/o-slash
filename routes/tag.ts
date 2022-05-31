import express, { Router } from 'express';
import { tagValidator } from '../validators/tag';
import {createTag} from '../controllers/tag'

const router:Router = express.Router();

router.post('/tag', tagValidator, createTag);

export {
    router
}