'use client'

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import ImageUpload from '@/components/admin/ImageUpload';
import { uploadImageToCloudinary } from '@/lib/uploadUtils';

// ... (existing imports)

interface Member {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    github?: string;
    linkedin?: string;
    isActive: boolean;
    joinedAt: string;
    role?: string;
}

export default function MembersManagementPage() {
    const { token, user } = useAppSelector((state) => state.adminAuth);
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
        bio: '',
        github: '',
        linkedin: ''
    });

    const [promotingMember, setPromotingMember] = useState<Member | null>(null);
    const [promotionRole, setPromotionRole] = useState('moderator');

    const isAdmin = user?.role === 'admin';

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/members`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMembers(response.data);
        } catch (error: any) {
            console.error('Error fetching members:', error);
            if (error?.response?.status === 403) {
                alert('You do not have permission to view members. Admin only.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!isAdmin) {
            alert('Only admins can delete members');
            return;
        }
        if (!confirm('Delete this member?')) return;

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/members/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    const handlePromote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!promotingMember) return;

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/promote`,
                { memberId: promotingMember._id, role: promotionRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(`Successfully promoted ${promotingMember.name} to ${promotionRole}`);
            setPromotingMember(null);
            fetchMembers(); // Refresh list to show updated role/removal
        } catch (error: any) {
            console.error('Error promoting member:', error);
            alert(error?.response?.data?.message || 'Failed to promote member');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdmin) {
            alert('Only admins can create/update members');
            return;
        }

        setIsSubmitting(true);
        try {
            let avatarUrl = formData.avatar;

            if (imageFile) {
                avatarUrl = await uploadImageToCloudinary(imageFile, token!);
            }

            const memberData = {
                ...formData,
                avatar: avatarUrl
            };

            if (editingMember) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/members/${editingMember._id}`,
                    memberData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/members/register`,
                    memberData
                );
            }
            fetchMembers();
            resetForm();
        } catch (error: any) {
            console.error('Error saving member:', error);
            alert(error?.response?.data?.message || 'Failed to save member');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ... (existing handleDelete)

    const handleEdit = (member: Member) => {
        if (!isAdmin) {
            alert('Only admins can edit members');
            return;
        }
        setEditingMember(member);
        setImageFile(null);
        setFormData({
            name: member.name,
            email: member.email,
            password: '',
            avatar: member.avatar || '',
            bio: member.bio || '',
            github: member.github || '',
            linkedin: member.linkedin || ''
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', password: '', avatar: '', bio: '', github: '', linkedin: '' });
        setImageFile(null);
        setEditingMember(null);
        setShowForm(false);
    };

    // ... (existing promotingMember state and handlePromote)

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Members Management</h1>
                    <p className="text-purple-200/60 mt-1">
                        {isAdmin ? 'Manage registered members & admins' : 'View registered members (Read-only)'}
                    </p>
                    {!isAdmin && (
                        <p className="text-yellow-400 text-sm mt-2">⚠️ Admin only - You can only view members</p>
                    )}
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                        {showForm ? 'Cancel' : '+ Add Member'}
                    </button>
                )}
            </div>

            {showForm && isAdmin && (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingMember ? 'Edit Member' : 'Add New Member'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required disabled={isSubmitting} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required disabled={isSubmitting} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        </div>
                        {!editingMember && (
                            <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required disabled={isSubmitting} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        )}
                        
                        <ImageUpload
                            currentImage={formData.avatar}
                            onFileSelect={setImageFile}
                            label="Profile Photo"
                        />
                        
                        <textarea placeholder="Bio (optional)" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} disabled={isSubmitting} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="url" placeholder="GitHub URL (optional)" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} disabled={isSubmitting} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                            <input type="url" placeholder="LinkedIn URL (optional)" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} disabled={isSubmitting} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        </div>
                        <div className="flex gap-3">
                            <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50">
                                {isSubmitting ? 'Saving...' : (editingMember ? 'Update' : 'Create') + ' Member'}
                            </button>
                            <button type="button" onClick={resetForm} disabled={isSubmitting} className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {promotingMember && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-white/20 rounded-2xl p-6 w-full max-w-md m-4">
                        <h2 className="text-xl font-bold text-white mb-4">Promote Member</h2>
                        <p className="text-purple-200/80 mb-6">
                            Select a role for <strong>{promotingMember.name}</strong>. They will gain admin access based on this role.
                        </p>
                        <form onSubmit={handlePromote} className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-purple-200">Select Role</label>
                                <select
                                    value={promotionRole}
                                    onChange={(e) => setPromotionRole(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                >
                                    <option value="moderator" className="bg-gray-800">Moderator (Manage Content)</option>
                                    <option value="superuser" className="bg-gray-800">Superuser (Full Access)</option>
                                    <option value="admin" className="bg-gray-800">Admin (Full Control)</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                                    Promote
                                </button>
                                <button type="button" onClick={() => setPromotingMember(null)} className="flex-1 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-purple-200 py-12">Loading...</div>
                ) : members.length === 0 ? (
                    <div className="col-span-full text-center text-purple-200/60 py-12">No members yet</div>
                ) : (
                    members.map((member) => (
                        <div key={member._id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden">
                            {/* Role Badge */}
                            <div className={`absolute top-4 right-4 px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                                member.role === 'admin' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                member.role === 'superuser' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                                member.role === 'moderator' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            }`}>
                                {member.role || 'Member'}
                            </div>

                            {member.avatar && <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-white/10" />}
                            <h3 className="text-lg font-bold text-white text-center">{member.name}</h3>
                            <p className="text-purple-200/80 text-center text-sm mb-2">{member.email}</p>
                            {member.bio && <p className="text-purple-200/60 text-sm mb-4 line-clamp-3 text-center">{member.bio}</p>}
                            
                            <div className="flex justify-center gap-3 mb-4">
                                {member.github && <a href={member.github} target="_blank" className="text-purple-200 hover:text-white text-sm transition-colors">GitHub</a>}
                                {member.linkedin && <a href={member.linkedin} target="_blank" className="text-purple-200 hover:text-white text-sm transition-colors">LinkedIn</a>}
                            </div>
                            
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${member.isActive ? 'bg-green-500/30 text-green-200' : 'bg-gray-500/30 text-gray-200'}`}>
                                    {member.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <span className="text-xs text-purple-200/60">
                                    Joined {new Date(member.joinedAt).toLocaleDateString()}
                                </span>
                            </div>

                            {isAdmin && (
                                <div className="space-y-2 pt-2 border-t border-white/10">
                                    {member.role === 'member' && (
                                        <button 
                                            onClick={() => setPromotingMember(member)}
                                            className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 rounded-lg hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300 border border-yellow-500/30 text-sm font-medium"
                                        >
                                            ⬆️ Promote to Admin
                                        </button>
                                    )}
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(member)} className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-200 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm">Edit</button>
                                        <button onClick={() => handleDelete(member._id)} className="flex-1 px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm">Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
