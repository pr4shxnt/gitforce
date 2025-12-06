import express from 'express';
import { getMessages, sendMessage, deleteOldMessages } from '../controllers/message.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All message routes require authentication
router.get('/:chatType', authenticate, getMessages);
router.post('/:chatType', authenticate, sendMessage);
router.delete('/cleanup', authenticate, deleteOldMessages);

export default router;
