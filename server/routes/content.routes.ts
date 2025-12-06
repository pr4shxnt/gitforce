import express from 'express';
import { getContentByPage, getContentBySection, createOrUpdateContent, deleteContent } from '../controllers/content.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { canModify } from '../middlewares/role.middleware.js';

const router = express.Router();

// Public routes
router.get('/page/:page', getContentByPage);
router.get('/page/:page/section/:section', getContentBySection);

// Protected routes - Admin/Superuser only
router.post('/', authenticate, canModify, createOrUpdateContent);
router.delete('/:id', authenticate, canModify, deleteContent);

export default router;
