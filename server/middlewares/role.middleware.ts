import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

// Only admin can access
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        res.status(403).json({ message: 'Access denied. Admin only.' });
        return;
    }
    next();
};

// Admin or Superuser can access
export const adminOrSuperuser = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin' && req.user?.role !== 'superuser') {
        res.status(403).json({ message: 'Access denied. Admin or Superuser only.' });
        return;
    }
    next();
};

// Check if user can modify (create/update/delete) - Admin or Superuser
export const canModify = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin' && req.user?.role !== 'superuser') {
        res.status(403).json({ message: 'Access denied. You do not have permission to modify this resource.' });
        return;
    }
    next();
};
