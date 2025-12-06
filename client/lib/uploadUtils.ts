import axios from 'axios';

export const uploadImageToCloudinary = async (file: File, token: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
        formData,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
    );

    return response.data.url;
};

export const deleteImageFromCloudinary = async (publicId: string, token: string): Promise<void> => {
    await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
        {
            headers: { Authorization: `Bearer ${token}` },
            data: { publicId }
        }
    );
};

// Extract public ID from Cloudinary URL
export const getPublicIdFromUrl = (url: string): string | null => {
    try {
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        return filename.split('.')[0];
    } catch {
        return null;
    }
};
