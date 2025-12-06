import { Request, Response } from 'express';
import cloudinary from '../services/cloudinary.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const uploadImage = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'gitforce',
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(req.file!.buffer);
        });

        const uploadResult = result as any;

        res.status(200).json({
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Error uploading file', error });
    }
};

export const deleteImage = async (req: AuthRequest, res: Response) => {
    try {
        const { publicId } = req.body;

        if (!publicId) {
            res.status(400).json({ message: 'Public ID required' });
            return;
        }

        await cloudinary.uploader.destroy(publicId);

        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Error deleting file', error });
    }
};
