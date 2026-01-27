import express from 'express';
import { getAllMembers, registerMember, updateMember, deleteMember } from '../controllers/member.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly, adminOrSuperuser } from '../middlewares/role.middleware.js';

const router = express.Router();

// Public route for registration
router.post('/register', registerMember);

// Admin-only routes - ONLY ADMIN can view/manage members
router.get('/', authenticate, adminOrSuperuser, getAllMembers);
router.put('/:id', authenticate, adminOnly, updateMember);
router.delete('/:id', authenticate, adminOnly, deleteMember);

export default router;
