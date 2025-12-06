import { Response } from 'express';
import Gallery from '../models/gallery.model.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';

export const getAllGalleryItems = async (req: AuthRequest, res: Response) => {
    try {
        const items = await Gallery.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gallery items', error });
    }
};

export const createGalleryItem = async (req: AuthRequest, res: Response) => {
    try {
        const newItem = new Gallery(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating gallery item', error });
    }
};

export const updateGalleryItem = async (req: AuthRequest, res: Response) => {
    try {
        const item = await Gallery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!item) {
            res.status(404).json({ message: 'Gallery item not found' });
            return;
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error updating gallery item', error });
    }
};

export const deleteGalleryItem = async (req: AuthRequest, res: Response) => {
    try {
        const item = await Gallery.findByIdAndDelete(req.params.id);
        if (!item) {
            res.status(404).json({ message: 'Gallery item not found' });
            return;
        }
        res.status(200).json({ message: 'Gallery item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting gallery item', error });
    }
};
