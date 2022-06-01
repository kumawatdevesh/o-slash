import express, { Router } from 'express';
import {createShortCut, deleteShortcut, getShortcuts} from '../controllers/shortcut';
import { authenticateUser, verifyToken } from '../middlewares/auth';
import {shortcutValidator} from '../validators/shortcut'

const router:Router = express.Router();

router.post('/shortcut', shortcutValidator, verifyToken, authenticateUser, createShortCut);

router.get('/shortcut', verifyToken, authenticateUser, getShortcuts);

router.delete('/shortcut/:id', verifyToken, authenticateUser, deleteShortcut);

export {
    router
}