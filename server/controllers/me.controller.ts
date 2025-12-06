import { Request, Response } from 'express';
import Admin from '../models/admin.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        const admin = await Admin.findById(req.user?.id).select('-password');
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin data', error });
    }
};
