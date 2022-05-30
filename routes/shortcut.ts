import express, { Router } from 'express';
import {createShortCut, deleteShortcut, getShortcuts} from '../controllers/shortcut';
import { verifyToken } from '../middlewares/auth';
import {shortcutValidator} from '../validators/shortcut'

const router:Router = express.Router();

router.post('/shortcut', shortcutValidator, verifyToken, createShortCut);

router.get('/shortcut', verifyToken, getShortcuts);

router.delete('/shortcut/:id', verifyToken, deleteShortcut);

export {
    router
}