import { Response } from 'express';
import TeamMember from '../models/team-member.model.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';

export const getAllTeamMembers = async (req: AuthRequest, res: Response) => {
    try {
        const members = await TeamMember.find().sort({ order: 1 });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team members', error });
    }
};

export const createTeamMember = async (req: AuthRequest, res: Response) => {
    try {
        const newMember = new TeamMember(req.body);
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(500).json({ message: 'Error creating team member', error });
    }
};

export const updateTeamMember = async (req: AuthRequest, res: Response) => {
    try {
        const member = await TeamMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!member) {
            res.status(404).json({ message: 'Team member not found' });
            return;
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(500).json({ message: 'Error updating team member', error });
    }
};

export const deleteTeamMember = async (req: AuthRequest, res: Response) => {
    try {
        const member = await TeamMember.findByIdAndDelete(req.params.id);
        if (!member) {
            res.status(404).json({ message: 'Team member not found' });
            return;
        }
        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team member', error });
    }
};
