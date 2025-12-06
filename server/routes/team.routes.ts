import express from 'express';
import { getAllTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../controllers/team.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { canModify } from '../middlewares/role.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllTeamMembers);

// Protected routes - Admin/Superuser only
router.post('/', authenticate, canModify, createTeamMember);
router.put('/:id', authenticate, canModify, updateTeamMember);
router.delete('/:id', authenticate, canModify, deleteTeamMember);

export default router;
