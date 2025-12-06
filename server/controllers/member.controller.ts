import { Response } from 'express';
import Member from '../models/member.model';
import bcrypt from 'bcrypt';
import { AuthRequest } from '../middlewares/auth.middleware';

import Admin from '../models/admin.model';

export const getAllMembers = async (req: AuthRequest, res: Response) => {
    try {
        // Fetch all active members and all admins
        const [members, admins] = await Promise.all([
            Member.find({ isActive: true }).select('-password').lean(),
            Admin.find().select('-password').lean()
        ]);

        const combinedUsers: any[] = [];

        // Add admins
        admins.forEach((admin: any) => {
            combinedUsers.push({
                ...admin,
                _id: admin._id,
                role: admin.role,
                isAdmin: true,
                // Ensure profile fields exist even if empty
                avatar: admin.avatar || '',
                bio: admin.bio || '',
                github: admin.github || '',
                linkedin: admin.linkedin || '',
                isActive: true,
                joinedAt: admin.createdAt
            });
        });

        // Add members
        members.forEach((member: any) => {
            combinedUsers.push({
                ...member,
                role: 'member',
                isAdmin: false
            });
        });

        // Sort by joined date (newest first)
        combinedUsers.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());

        res.status(200).json(combinedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching members', error });
    }
};

export const registerMember = async (req: AuthRequest, res: Response) => {
    try {
        const { name, email, password } = req.body;
        
        const existingMember = await Member.findOne({ email });
        if (existingMember) {
            res.status(400).json({ message: 'Member already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newMember = new Member({
            ...req.body,
            password: hashedPassword
        });
        
        await newMember.save();
        
        const memberObj = newMember.toObject();
        const { password: _password, ...safeMemberObj } = memberObj as any;
        
        res.status(201).json({ message: 'Member registered successfully', member: safeMemberObj });
    } catch (error) {
        res.status(500).json({ message: 'Error registering member', error });
    }
};

export const updateMember = async (req: AuthRequest, res: Response) => {
    try {
        const { password, ...updateData } = req.body;
        
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select('-password');
        
        if (!member) {
            res.status(404).json({ message: 'Member not found' });
            return;
        }
        
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Error updating member', error });
    }
};

export const deleteMember = async (req: AuthRequest, res: Response) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        
        if (!member) {
            res.status(404).json({ message: 'Member not found' });
            return;
        }
        
        res.status(200).json({ message: 'Member deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting member', error });
    }
};
