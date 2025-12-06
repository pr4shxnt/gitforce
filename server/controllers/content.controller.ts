import { Response } from 'express';
import Content from '../models/content.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getContentByPage = async (req: AuthRequest, res: Response) => {
    try {
        const { page } = req.params;
        const content = await Content.find({ page }).sort({ section: 1 });
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error });
    }
};

export const getContentBySection = async (req: AuthRequest, res: Response) => {
    try {
        const { page, section } = req.params;
        const content = await Content.findOne({ page, section });
        if (!content) {
            res.status(404).json({ message: 'Content not found' });
            return;
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error });
    }
};

export const createOrUpdateContent = async (req: AuthRequest, res: Response) => {
    try {
        const { page, section } = req.body;
        const content = await Content.findOneAndUpdate(
            { page, section },
            req.body,
            { new: true, upsert: true }
        );
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: 'Error saving content', error });
    }
};

export const deleteContent = async (req: AuthRequest, res: Response) => {
    try {
        const content = await Content.findByIdAndDelete(req.params.id);
        if (!content) {
            res.status(404).json({ message: 'Content not found' });
            return;
        }
        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting content', error });
    }
};
