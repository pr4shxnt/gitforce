import express from 'express';
import { createAdmin, loginAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin, verifyOtp } from '../controllers/admin.controller';
import { getMe } from '../controllers/me.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', createAdmin);
router.post('/login', loginAdmin);
router.post('/verify-otp', verifyOtp);

// Protected routes
router.get('/me', authenticate, getMe);
router.get('/', authenticate, getAllAdmins);
router.get('/:id', authenticate, getAdminById);
router.put('/:id', authenticate, updateAdmin);
router.delete('/:id', authenticate, deleteAdmin);

export default router;
