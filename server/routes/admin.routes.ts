import express from 'express';
import { createAdmin, loginAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, verifyOtp, promoteMember } from '../controllers/admin.controller.js';
import { getMe } from '../controllers/me.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/register', createAdmin);
router.post('/login', loginAdmin);
router.post('/verify-otp', verifyOtp);

// Protected routes
router.get('/me', authenticate, getMe);
router.get('/', authenticate, getAllAdmins);
router.get('/:id', authenticate, getAdminById);
router.put('/:id', authenticate, updateAdmin);
router.delete('/:id', authenticate, adminOnly, deleteAdmin);
router.post('/promote', authenticate, adminOnly, promoteMember);

export default router;
