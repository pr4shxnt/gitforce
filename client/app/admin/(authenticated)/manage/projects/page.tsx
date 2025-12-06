'use client'

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';

interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    order: number;
}

export default function ProjectsManagementPage() {
    const { token } = useAppSelector((state) => state.adminAuth);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        featured: false,
        order: 0
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const projectData = {
                ...formData,
                technologies: formData.technologies.split(',').map(t => t.trim())
            };

            if (editingProject) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/projects/${editingProject._id}`,
                    projectData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/projects`,
                    projectData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            fetchProjects();
            resetForm();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies.join(', '),
            githubUrl: project.githubUrl || '',
            liveUrl: project.liveUrl || '',
            featured: project.featured,
            order: project.order
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            image: '',
            technologies: '',
            githubUrl: '',
            liveUrl: '',
            featured: false,
            order: 0
        });
        setEditingProject(null);
        setShowForm(false);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projects Management</h1>
                    <p className="text-purple-200/60 mt-1">Manage your portfolio projects</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                    {showForm ? 'Cancel' : '+ Add Project'}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingProject ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Project Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                required
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            rows={3}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <input
                            type="text"
                            placeholder="Technologies (comma separated)"
                            value={formData.technologies}
                            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="url"
                                placeholder="GitHub URL (optional)"
                                value={formData.githubUrl}
                                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                            <input
                                type="url"
                                placeholder="Live URL (optional)"
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-5 h-5 rounded bg-white/10 border-white/20"
                                />
                                <span>Featured Project</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Order"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-32"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                            >
                                {editingProject ? 'Update Project' : 'Create Project'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-purple-200 py-12">Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className="col-span-full text-center text-purple-200/60 py-12">
                        <p>No projects yet</p>
                        <p className="text-sm mt-2">Click "Add Project" to create one</p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                                    {project.featured && (
                                        <span className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full">
                                            ⭐ Featured
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-purple-200/80 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 text-xs bg-purple-500/30 text-purple-200 rounded-lg"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-200 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="flex-1 px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
