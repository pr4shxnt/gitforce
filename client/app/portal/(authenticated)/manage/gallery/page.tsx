'use client'

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import ImageUpload from '@/components/admin/ImageUpload';
import { uploadImageToCloudinary } from '@/lib/uploadUtils';

interface GalleryItem {
    _id: string;
    title: string;
    description?: string;
    imageUrl: string;
    category: string;
    order: number;
}

export default function GalleryManagementPage() {
    const { token } = useAppSelector((state) => state.adminAuth);
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        category: 'general',
        order: 0
    });

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gallery`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching gallery:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.imageUrl && !imageFile) {
            alert('Please select an image');
            return;
        }

        setIsSubmitting(true);
        try {
            let finalImageUrl = formData.imageUrl;

            if (imageFile) {
                finalImageUrl = await uploadImageToCloudinary(imageFile, token!);
            }

            const itemData = {
                ...formData,
                imageUrl: finalImageUrl
            };

            if (editingItem) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/gallery/${editingItem._id}`,
                    itemData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/gallery`,
                    itemData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            fetchGallery();
            resetForm();
        } catch (error: any) {
            console.error('Error saving gallery item:', error);
            alert(error?.response?.data?.message || 'Failed to save gallery item');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this image?')) return;
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchGallery();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item: GalleryItem) => {
        setEditingItem(item);
        setImageFile(null);
        setFormData({
            title: item.title,
            description: item.description || '',
            imageUrl: item.imageUrl,
            category: item.category,
            order: item.order
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', imageUrl: '', category: 'general', order: 0 });
        setImageFile(null);
        setEditingItem(null);
        setShowForm(false);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
                    <p className="text-purple-200/60 mt-1">Manage your image gallery</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                    {showForm ? 'Cancel' : '+ Add Image'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingItem ? 'Edit Image' : 'Add New Image'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        
                        <ImageUpload
                            currentImage={formData.imageUrl}
                            onFileSelect={setImageFile}
                            label="Gallery Image"
                        />
                        <textarea
                            placeholder="Description (optional)"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                            <input
                                type="number"
                                placeholder="Order"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                                {editingItem ? 'Update' : 'Add'} Image
                            </button>
                            <button type="button" onClick={resetForm} className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isLoading ? (
                    <div className="col-span-full text-center text-purple-200 py-12">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="col-span-full text-center text-purple-200/60 py-12">No images yet</div>
                ) : (
                    items.map((item) => (
                        <div key={item._id} className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                            <div className="p-3">
                                <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
                                <p className="text-purple-200/60 text-xs">{item.category}</p>
                            </div>
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                <button onClick={() => handleEdit(item)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
