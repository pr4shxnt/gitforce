'use client'

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    bio?: string;
    avatar?: string;
    github?: string;
    linkedin?: string;
    email?: string;
    order: number;
    active: boolean;
}

export default function TeamManagementPage() {
    const { token, user } = useAppSelector((state) => state.adminAuth);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        avatar: '',
        github: '',
        linkedin: '',
        email: '',
        order: 0,
        active: true
    });

    const canModify = user?.role === 'admin' || user?.role === 'superuser';

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/team`);
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching team:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canModify) return;

        try {
            if (editingMember) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/team/${editingMember._id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/team`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            fetchMembers();
            resetForm();
        } catch (error: any) {
            console.error('Error saving member:', error);
            alert(error?.response?.data?.message || 'Failed to save team member');
        }
    };

    const handleDelete = async (id: string) => {
        if (!canModify || !confirm('Delete this team member?')) return;

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/team/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    const handleEdit = (member: TeamMember) => {
        if (!canModify) return;
        setEditingMember(member);
        setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio || '',
            avatar: member.avatar || '',
            github: member.github || '',
            linkedin: member.linkedin || '',
            email: member.email || '',
            order: member.order,
            active: member.active
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({ name: '', role: '', bio: '', avatar: '', github: '', linkedin: '', email: '', order: 0, active: true });
        setEditingMember(null);
        setShowForm(false);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Team Management</h1>
                    <p className="text-purple-200/60 mt-1">Manage your team members</p>
                    {!canModify && (
                        <p className="text-yellow-400 text-sm mt-2">⚠️ View only - You don't have permission to modify</p>
                    )}
                </div>
                {canModify && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                        {showForm ? 'Cancel' : '+ Add Member'}
                    </button>
                )}
            </div>

            {showForm && canModify && (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                            <input type="text" placeholder="Role/Position" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        </div>
                        <textarea placeholder="Bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        <input type="url" placeholder="Avatar URL" value={formData.avatar} onChange={(e) => setFormData({ ...formData, avatar: e.target.value })} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        <div className="grid grid-cols-3 gap-4">
                            <input type="url" placeholder="GitHub URL" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                            <input type="url" placeholder="LinkedIn URL" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-white cursor-pointer">
                                <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="w-5 h-5 rounded bg-white/10 border-white/20" />
                                <span>Active</span>
                            </label>
                            <input type="number" placeholder="Order" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-32" />
                        </div>
                        <div className="flex gap-3">
                            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                                {editingMember ? 'Update' : 'Add'} Member
                            </button>
                            <button type="button" onClick={resetForm} className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-purple-200 py-12">Loading...</div>
                ) : members.length === 0 ? (
                    <div className="col-span-full text-center text-purple-200/60 py-12">No team members yet</div>
                ) : (
                    members.map((member) => (
                        <div key={member._id} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                            {member.avatar && <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />}
                            <h3 className="text-lg font-bold text-white text-center">{member.name}</h3>
                            <p className="text-purple-200/80 text-center text-sm mb-3">{member.role}</p>
                            {member.bio && <p className="text-purple-200/60 text-sm mb-4 line-clamp-3">{member.bio}</p>}
                            <div className="flex justify-center gap-3 mb-4">
                                {member.github && <a href={member.github} target="_blank" className="text-purple-200 hover:text-white">GitHub</a>}
                                {member.linkedin && <a href={member.linkedin} target="_blank" className="text-purple-200 hover:text-white">LinkedIn</a>}
                            </div>
                            {canModify && (
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(member)} className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-200 rounded-lg hover:bg-blue-500/30 transition-all duration-300">Edit</button>
                                    <button onClick={() => handleDelete(member._id)} className="flex-1 px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-all duration-300">Delete</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
