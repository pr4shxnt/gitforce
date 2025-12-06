import express from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/project.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { canModify } from '../middlewares/role.middleware.js';

const router = express.Router();

// Public routes (view only)
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes - Admin/Superuser only can modify
router.post('/', authenticate, canModify, createProject);
router.put('/:id', authenticate, canModify, updateProject);
router.delete('/:id', authenticate, canModify, deleteProject);

export default router;
