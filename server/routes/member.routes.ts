import express from 'express';
import { getAllMembers, registerMember, updateMember, deleteMember } from '../controllers/member.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { adminOnly } from '../middlewares/role.middleware';

const router = express.Router();

// Public route for registration
router.post('/register', registerMember);

// Admin-only routes - ONLY ADMIN can view/manage members
router.get('/', authenticate, adminOnly, getAllMembers);
router.put('/:id', authenticate, adminOnly, updateMember);
router.delete('/:id', authenticate, adminOnly, deleteMember);

export default router;
