import { Request, Response } from 'express';
import Admin from '../models/admin.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/notification.utility.js';
import NodeCache from 'node-cache';

const otpCache = new NodeCache({ stdTTL: 600 }); // 10 minutes

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        
        // input validation
        if (!name || typeof name !== "string") {
             res.status(400).json({ message: "Invalid or missing 'name'." });
             return;
        }

        // password validation
        if (!password || typeof password !== "string") {
             res.status(400).json({ message: "Invalid or missing 'password'." });
             return;
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|np|in)$/;
        if (!email || !emailRegex.test(email)) {
             res.status(400).json({ message: "Invalid or missing 'email'." });
             return;
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            res.status(400).json({ message: 'Admin already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ name, email, password: hashedPassword, role });
        await newAdmin.save();

        const adminObj = newAdmin.toObject ? newAdmin.toObject() : { ...newAdmin };
        const { password: _password, ...safeAdminObj } = adminObj as any;

        res.status(201).json({ message: 'Admin created successfully', admin: safeAdminObj });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error });
    }
};

import Member from '../models/member.model.js';

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // Try finding admin first
        let user: any = await Admin.findOne({ email });
        let isMember = false;

        // If not admin, try finding member
        if (!user) {
            user = await Member.findOne({ email });
            isMember = true;
        }

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Check password (works for both models as they have password field)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Store in cache with type indicator
        otpCache.set(`otp_${email}`, { otp, type: isMember ? 'member' : 'admin' });

        await sendMail({
            purpose: 'otp',
            email: user.email,
            data: { otp }
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        
        const cachedData: any = otpCache.get(`otp_${email}`);

        if (!cachedData) {
            res.status(400).json({ message: 'OTP expired or not requested' });
            return;
        }

        if (cachedData.otp !== otp) {
            res.status(400).json({ message: 'Invalid OTP' });
            return;
        }

        let user: any;
        let role = 'member';

        if (cachedData.type === 'admin') {
            user = await Admin.findOne({ email });
            role = user.role;
        } else {
            user = await Member.findOne({ email });
            // Members have 'member' role by default
        }

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Clear OTP from cache
        otpCache.del(`otp_${email}`);

        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET || 'secret', { expiresIn: '10d' });
        
        res.status(200).json({ 
            message: 'Login successful', 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};

export const promoteMember = async (req: Request, res: Response) => {
    try {
        const { memberId, role } = req.body;
        
        if (!['admin', 'superuser', 'moderator'].includes(role)) {
            res.status(400).json({ message: 'Invalid role for promotion' });
            return;
        }

        const member = await Member.findById(memberId);
        if (!member) {
            res.status(404).json({ message: 'Member not found' });
            return;
        }

        // Check if already an admin
        const existingAdmin = await Admin.findOne({ email: member.email });
        if (existingAdmin) {
            existingAdmin.role = role;
            await existingAdmin.save();
            res.status(200).json({ message: 'User role updated successfully', admin: existingAdmin });
            return;
        }

        // Create new admin from member details
        // Note: We use the same password hash so they can login with same credentials
        const newAdmin = new Admin({
            name: member.name,
            email: member.email,
            password: member.password,
            role: role,
            avatar: member.avatar,
            bio: member.bio,
            github: member.github,
            linkedin: member.linkedin
        });

        await newAdmin.save();
        
        // Delete the member record as they are now an admin
        await Member.findByIdAndDelete(memberId);

        res.status(201).json({ message: 'Member promoted successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error promoting member', error });
    }
};

export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await Admin.find().select('-password');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error });
    }
};

export const getAdminById = async (req: Request, res: Response) => {
    try {
        const admin = await Admin.findById(req.params.id).select('-password');
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin', error });
    }
};

export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, role } = req.body;
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true }
        ).select('-password');

        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }
        res.status(200).json({ message: 'Admin updated successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin', error });
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error });
    }
};
