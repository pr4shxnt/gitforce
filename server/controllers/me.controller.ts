import { Request, Response } from 'express';
import Admin from '../models/admin.model.js';
import Member from "../models/member.model.js"
import { AuthRequest } from '../middlewares/auth.middleware.js';

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        const admin = await Admin.findById(req.user?.id).select('-password');
        const member = await Member.findById(req.user?.id).select('-password');
        if (!admin || !member) {
            res.status(404).json({ message: 'Core member not found not found' });
            return;
        }
        res.status(200).json(admin ? admin : member);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin data', error });
    }
};
