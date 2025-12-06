'use client'

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';

interface ContentItem {
    _id: string;
    page: string;
    section: string;
    content: any;
    published: boolean;
}

export default function ContentManagementPage() {
    const { token, user } = useAppSelector((state) => state.adminAuth);
    const [items, setItems] = useState<ContentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
    const [formData, setFormData] = useState({
        page: '',
        section: '',
        content: '',
        published: true
    });

    const canModify = user?.role === 'admin' || user?.role === 'superuser';

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            // Fetch content for common pages
            const pages = ['home', 'about', 'services'];
            const allContent: ContentItem[] = [];
            
            for (const page of pages) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/content/page/${page}`);
                    allContent.push(...response.data);
                } catch (error) {
                    // Page might not have content yet
                }
            }
            
            setItems(allContent);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canModify) return;

        try {
            let contentData;
            try {
                contentData = JSON.parse(formData.content);
            } catch {
                contentData = { text: formData.content };
            }

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/content`,
                {
                    page: formData.page,
                    section: formData.section,
                    content: contentData,
                    published: formData.published
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            fetchContent();
            resetForm();
        } catch (error: any) {
            console.error('Error saving content:', error);
            alert(error?.response?.data?.message || 'Failed to save content');
        }
    };

    const handleDelete = async (id: string) => {
        if (!canModify || !confirm('Delete this content?')) return;

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/content/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchContent();
        } catch (error) {
            console.error('Error deleting content:', error);
        }
    };

    const handleEdit = (item: ContentItem) => {
        if (!canModify) return;
        setEditingItem(item);
        setFormData({
            page: item.page,
            section: item.section,
            content: JSON.stringify(item.content, null, 2),
            published: item.published
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({ page: '', section: '', content: '', published: true });
        setEditingItem(null);
        setShowForm(false);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Content Management</h1>
                    <p className="text-purple-200/60 mt-1">Manage page content and sections</p>
                    {!canModify && (
                        <p className="text-yellow-400 text-sm mt-2">⚠️ View only - You don't have permission to modify</p>
                    )}
                </div>
                {canModify && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                        {showForm ? 'Cancel' : '+ Add Content'}
                    </button>
                )}
            </div>

            {showForm && canModify && (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingItem ? 'Edit Content' : 'Add New Content'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Page (e.g., home, about)"
                                value={formData.page}
                                onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                                required
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                            <input
                                type="text"
                                placeholder="Section (e.g., hero, features)"
                                value={formData.section}
                                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                required
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                        <textarea
                            placeholder="Content (JSON or plain text)"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                            rows={8}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-mono text-sm"
                        />
                        <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-5 h-5 rounded bg-white/10 border-white/20"
                            />
                            <span>Published</span>
                        </label>
                        <div className="flex gap-3">
                            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                                {editingItem ? 'Update' : 'Create'} Content
                            </button>
                            <button type="button" onClick={resetForm} className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-purple-200 py-12">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="col-span-full text-center text-purple-200/60 py-12">No content yet</div>
                ) : (
                    items.map((item) => (
                        <div key={item._id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{item.page} / {item.section}</h3>
                                    {item.published ? (
                                        <span className="text-xs px-2 py-1 bg-green-500/30 text-green-200 rounded-full">Published</span>
                                    ) : (
                                        <span className="text-xs px-2 py-1 bg-gray-500/30 text-gray-200 rounded-full">Draft</span>
                                    )}
                                </div>
                            </div>
                            <pre className="text-sm text-purple-200/80 bg-black/20 p-3 rounded-lg overflow-auto max-h-40">
                                {JSON.stringify(item.content, null, 2)}
                            </pre>
                            {canModify && (
                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => handleEdit(item)} className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-200 rounded-lg hover:bg-blue-500/30 transition-all duration-300">Edit</button>
                                    <button onClick={() => handleDelete(item._id)} className="flex-1 px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-all duration-300">Delete</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
